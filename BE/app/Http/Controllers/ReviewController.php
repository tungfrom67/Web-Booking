<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Hotel;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ReviewController extends Controller
{
    public function index(Request $request, $hotelId): JsonResponse
    {
        Hotel::findOrFail($hotelId);

        $query = Review::with(['user:id,first_name,last_name,avatar', 'responses.user:id,first_name,last_name'])
            ->where('hotel_id', $hotelId)
            ->approved();

        if ($request->filled('rating')) $query->where('overall_rating', '>=', $request->rating);
        if ($request->filled('sort_by')) {
            match ($request->sort_by) {
                'newest' => $query->latest(),
                'oldest' => $query->oldest(),
                'highest' => $query->orderBy('overall_rating', 'desc'),
                'lowest' => $query->orderBy('overall_rating', 'asc'),
                'helpful' => $query->withCount(['votes as helpful_count' => fn($q) => $q->where('vote_type', 'helpful')])->orderBy('helpful_count', 'desc'),
                default => $query->latest(),
            };
        } else {
            $query->latest();
        }

        $reviews = $query->paginate(min((int) $request->get('per_page', 10), 50));

        // Add summary
        $allReviews = Review::where('hotel_id', $hotelId)->approved();
        $summary = [
            'total' => $allReviews->count(),
            'average' => round($allReviews->avg('overall_rating') ?? 0, 1),
            'distribution' => [
                5 => (clone $allReviews)->where('overall_rating', '>=', 4.5)->count(),
                4 => (clone $allReviews)->whereBetween('overall_rating', [3.5, 4.49])->count(),
                3 => (clone $allReviews)->whereBetween('overall_rating', [2.5, 3.49])->count(),
                2 => (clone $allReviews)->whereBetween('overall_rating', [1.5, 2.49])->count(),
                1 => (clone $allReviews)->where('overall_rating', '<', 1.5)->count(),
            ],
        ];

        return response()->json(['reviews' => $reviews, 'summary' => $summary]);
    }

    public function store(Request $request): JsonResponse
    {
        $v = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'booking_id' => 'required|exists:bookings,id',
            'overall_rating' => 'required|numeric|min:1|max:5',
            'cleanliness_rating' => 'nullable|numeric|min:1|max:5',
            'service_rating' => 'nullable|numeric|min:1|max:5',
            'location_rating' => 'nullable|numeric|min:1|max:5',
            'value_rating' => 'nullable|numeric|min:1|max:5',
            'title' => 'nullable|string|max:255',
            'comment' => 'required|string|min:10|max:2000',
            'pros' => 'nullable|string|max:500',
            'cons' => 'nullable|string|max:500',
            'trip_type' => 'nullable|string|in:business,couple,family,friends,solo',
        ]);

        // Verify booking belongs to user and is completed
        $booking = Booking::where('id', $v['booking_id'])
            ->where('user_id', $request->user()->id)
            ->where('hotel_id', $v['hotel_id'])
            ->whereIn('status', ['checked_out', 'confirmed'])
            ->first();

        if (!$booking) {
            return response()->json(['message' => 'Bạn chỉ có thể đánh giá sau khi đã hoàn thành đặt phòng'], 422);
        }

        // Check if already reviewed
        $existing = Review::where('booking_id', $v['booking_id'])->where('user_id', $request->user()->id)->first();
        if ($existing) {
            return response()->json(['message' => 'Bạn đã đánh giá đặt phòng này rồi'], 422);
        }

        $v['user_id'] = $request->user()->id;
        $v['is_verified'] = true;
        $v['is_approved'] = true;
        $v['status'] = 'published';

        $review = Review::create($v);

        // Update hotel rating
        $hotel = Hotel::find($v['hotel_id']);
        $avgRating = Review::where('hotel_id', $v['hotel_id'])->approved()->avg('overall_rating');
        $reviewCount = Review::where('hotel_id', $v['hotel_id'])->approved()->count();
        $hotel->update(['review_rating' => round($avgRating, 1), 'review_count' => $reviewCount]);

        return response()->json([
            'message' => 'Cảm ơn bạn đã đánh giá!',
            'review' => $review->load('user:id,first_name,last_name,avatar'),
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $review = Review::where('user_id', $request->user()->id)->findOrFail($id);

        $v = $request->validate([
            'overall_rating' => 'sometimes|numeric|min:1|max:5',
            'comment' => 'sometimes|string|min:10|max:2000',
            'title' => 'nullable|string|max:255',
            'pros' => 'nullable|string|max:500',
            'cons' => 'nullable|string|max:500',
        ]);

        $review->update($v);

        // Update hotel rating
        $hotel = Hotel::find($review->hotel_id);
        $avgRating = Review::where('hotel_id', $review->hotel_id)->approved()->avg('overall_rating');
        $hotel->update(['review_rating' => round($avgRating, 1)]);

        return response()->json(['message' => 'Cập nhật đánh giá thành công', 'review' => $review->fresh()]);
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        $review = Review::findOrFail($id);
        if ($review->user_id !== $request->user()->id && !$request->user()->isAdmin()) {
            return response()->json(['message' => 'Không có quyền'], 403);
        }

        $hotelId = $review->hotel_id;
        $review->delete();

        // Update hotel rating
        $hotel = Hotel::find($hotelId);
        $avgRating = Review::where('hotel_id', $hotelId)->approved()->avg('overall_rating') ?? 0;
        $reviewCount = Review::where('hotel_id', $hotelId)->approved()->count();
        $hotel->update(['review_rating' => round($avgRating, 1), 'review_count' => $reviewCount]);

        return response()->json(['message' => 'Xóa đánh giá thành công']);
    }

    public function vote(Request $request, $id): JsonResponse
    {
        $review = Review::findOrFail($id);
        $v = $request->validate(['vote_type' => 'required|in:helpful,unhelpful']);

        $existing = $review->votes()->where('user_id', $request->user()->id)->first();
        if ($existing) {
            $existing->update(['vote_type' => $v['vote_type']]);
        } else {
            $review->votes()->create(['user_id' => $request->user()->id, 'vote_type' => $v['vote_type']]);
        }

        return response()->json(['message' => 'Đã ghi nhận']);
    }

    public function respond(Request $request, $id): JsonResponse
    {
        $review = Review::findOrFail($id);
        $v = $request->validate(['response' => 'required|string|min:10|max:1000']);

        $review->responses()->create([
            'user_id' => $request->user()->id,
            'response' => $v['response'],
        ]);

        return response()->json(['message' => 'Đã phản hồi đánh giá']);
    }
}
