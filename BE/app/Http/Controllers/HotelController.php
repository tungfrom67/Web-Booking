<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class HotelController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Hotel::with([
            'category', 'area.city',
            'images' => fn($q) => $q->orderBy('sort_order')->limit(5),
            'amenities',
        ])->active();

        if ($request->filled('type')) $query->byType($request->type);
        if ($request->filled('city_id')) $query->whereHas('area', fn($q) => $q->where('city_id', $request->city_id));
        if ($request->filled('area_id')) $query->byArea($request->area_id);
        if ($request->filled('star_rating')) $query->where('star_rating', '>=', $request->star_rating);

        if ($request->filled('min_price') || $request->filled('max_price')) {
            $query->whereHas('rooms', function ($q) use ($request) {
                if ($request->filled('min_price')) $q->where('base_price', '>=', $request->min_price);
                if ($request->filled('max_price')) $q->where('base_price', '<=', $request->max_price);
            });
        }

        if ($request->filled('amenities')) {
            $ids = is_array($request->amenities) ? $request->amenities : explode(',', $request->amenities);
            $query->whereHas('amenities', fn($q) => $q->whereIn('amenities.id', $ids));
        }

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'LIKE', "%{$s}%")
                  ->orWhere('address', 'LIKE', "%{$s}%")
                  ->orWhereHas('area', fn($q2) => $q2->where('name', 'LIKE', "%{$s}%"))
                  ->orWhereHas('area.city', fn($q2) => $q2->where('name', 'LIKE', "%{$s}%"));
            });
        }

        $sortBy = $request->get('sort_by', 'created_at');
        $sortDir = $request->get('sort_dir', 'desc');
        if (in_array($sortBy, ['name', 'star_rating', 'review_rating', 'created_at'])) {
            $query->orderBy($sortBy, $sortDir);
        }

        $hotels = $query->paginate(min((int) $request->get('per_page', 12), 50));
        $hotels->getCollection()->transform(function ($hotel) {
            $hotel->min_price = $hotel->rooms()->min('base_price');
            $hotel->max_price = $hotel->rooms()->max('base_price');
            $hotel->primary_image = $hotel->primaryImage;
            return $hotel;
        });

        return response()->json($hotels);
    }

    public function show($id): JsonResponse
    {
        $hotel = Hotel::with([
            'category', 'area.city.country',
            'images' => fn($q) => $q->orderBy('sort_order'),
            'amenities',
            'rooms' => fn($q) => $q->available()->with(['roomType', 'images', 'amenities', 'policies']),
            'reviews' => fn($q) => $q->approved()->with(['user:id,first_name,last_name,avatar', 'responses.user:id,first_name,last_name'])->latest()->limit(10),
            'specialOffers' => fn($q) => $q->active(),
        ])->findOrFail($id);

        $hotel->min_price = $hotel->rooms->min('base_price');
        $hotel->max_price = $hotel->rooms->max('base_price');

        return response()->json($hotel);
    }

    public function featured(Request $request): JsonResponse
    {
        $limit = min((int) $request->get('limit', 8), 20);
        $hotels = Hotel::with([
            'area.city',
            'images' => fn($q) => $q->orderBy('sort_order')->limit(3),
            'amenities',
        ])->active()->featured()->orderBy('review_rating', 'desc')->limit($limit)->get();

        $hotels->transform(function ($hotel) {
            $hotel->min_price = $hotel->rooms()->min('base_price');
            $hotel->primary_image = $hotel->primaryImage;
            return $hotel;
        });

        return response()->json($hotels);
    }

    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'destination' => 'nullable|string|max:255',
            'check_in' => 'nullable|date|after_or_equal:today',
            'check_out' => 'nullable|date|after:check_in',
            'adults' => 'nullable|integer|min:1|max:20',
            'children' => 'nullable|integer|min:0|max:10',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'star_rating' => 'nullable|numeric|min:1|max:5',
            'type' => 'nullable|string|in:hotel,resort,apartment,villa,hostel,guesthouse,motel',
            'amenities' => 'nullable|array',
            'sort_by' => 'nullable|string|in:price_asc,price_desc,rating,popularity',
        ]);

        $query = Hotel::with([
            'area.city', 'amenities',
            'images' => fn($q) => $q->orderBy('sort_order')->limit(3),
            'rooms' => fn($q) => $q->available(),
        ])->active();

        if (!empty($validated['destination'])) {
            $d = $validated['destination'];
            $query->where(function ($q) use ($d) {
                $q->where('name', 'LIKE', "%{$d}%")
                  ->orWhere('address', 'LIKE', "%{$d}%")
                  ->orWhereHas('area', fn($q2) => $q2->where('name', 'LIKE', "%{$d}%"))
                  ->orWhereHas('area.city', fn($q2) => $q2->where('name', 'LIKE', "%{$d}%"));
            });
        }

        if (!empty($validated['check_in']) && !empty($validated['check_out'])) {
            $ci = $validated['check_in']; $co = $validated['check_out'];
            $query->whereHas('rooms', function ($q) use ($ci, $co) {
                $q->available()->whereDoesntHave('bookingRooms', function ($bq) use ($ci, $co) {
                    $bq->whereHas('booking', function ($bkq) use ($ci, $co) {
                        $bkq->whereIn('status', ['pending', 'confirmed', 'checked_in'])
                            ->where(fn($dq) => $dq->whereBetween('check_in_date', [$ci, $co])
                                ->orWhereBetween('check_out_date', [$ci, $co])
                                ->orWhere(fn($q3) => $q3->where('check_in_date', '<=', $ci)->where('check_out_date', '>=', $co)));
                    });
                });
            });
        }

        if (!empty($validated['adults'])) {
            $total = ($validated['adults'] ?? 1) + ($validated['children'] ?? 0);
            $query->whereHas('rooms', fn($q) => $q->where('max_occupancy', '>=', $total));
        }
        if (!empty($validated['min_price'])) $query->whereHas('rooms', fn($q) => $q->where('base_price', '>=', $validated['min_price']));
        if (!empty($validated['max_price'])) $query->whereHas('rooms', fn($q) => $q->where('base_price', '<=', $validated['max_price']));
        if (!empty($validated['star_rating'])) $query->where('star_rating', '>=', $validated['star_rating']);
        if (!empty($validated['type'])) $query->byType($validated['type']);

        if (!empty($validated['amenities'])) {
            foreach ($validated['amenities'] as $aid) {
                $query->whereHas('amenities', fn($q) => $q->where('amenities.id', $aid));
            }
        }

        switch ($validated['sort_by'] ?? 'popularity') {
            case 'price_asc': $query->orderByRaw('(SELECT MIN(base_price) FROM rooms WHERE rooms.hotel_id = hotels.id) ASC'); break;
            case 'price_desc': $query->orderByRaw('(SELECT MIN(base_price) FROM rooms WHERE rooms.hotel_id = hotels.id) DESC'); break;
            case 'rating': $query->orderBy('review_rating', 'desc'); break;
            default: $query->orderBy('review_count', 'desc')->orderBy('review_rating', 'desc');
        }

        $hotels = $query->paginate(min((int) $request->get('per_page', 12), 50));
        $hotels->getCollection()->transform(function ($hotel) {
            $hotel->min_price = $hotel->rooms->min('base_price');
            $hotel->max_price = $hotel->rooms->max('base_price');
            $hotel->primary_image = $hotel->primaryImage;
            return $hotel;
        });

        return response()->json($hotels);
    }

    public function store(Request $request): JsonResponse
    {
        $v = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:hotel_categories,id',
            'area_id' => 'required|exists:areas,id',
            'type' => 'required|in:hotel,resort,apartment,villa,hostel,guesthouse,motel',
            'address' => 'required|string',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'star_rating' => 'nullable|numeric|min:1|max:5',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
        ]);
        $v['slug'] = Str::slug($v['name']);
        $v['owner_id'] = $request->user()->id;
        $v['status'] = 'pending';
        $c = 1;
        $base = $v['slug'];
        while (Hotel::where('slug', $v['slug'])->exists()) { $v['slug'] = $base . '-' . $c++; }

        $hotel = Hotel::create($v);
        return response()->json(['message' => 'Tạo khách sạn thành công', 'hotel' => $hotel->load('category', 'area.city')], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $hotel = Hotel::findOrFail($id);
        if (!$request->user()->isAdmin() && $hotel->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Không có quyền'], 403);
        }
        $v = $request->validate([
            'name' => 'sometimes|string|max:255',
            'category_id' => 'sometimes|exists:hotel_categories,id',
            'area_id' => 'sometimes|exists:areas,id',
            'type' => 'sometimes|in:hotel,resort,apartment,villa,hostel,guesthouse,motel',
            'address' => 'sometimes|string',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'star_rating' => 'nullable|numeric|min:1|max:5',
            'is_featured' => 'sometimes|boolean',
            'is_active' => 'sometimes|boolean',
            'status' => 'sometimes|in:active,inactive,pending,suspended',
        ]);
        if (isset($v['name'])) {
            $v['slug'] = Str::slug($v['name']);
            $base = $v['slug']; $c = 1;
            while (Hotel::where('slug', $v['slug'])->where('id', '!=', $id)->exists()) { $v['slug'] = $base . '-' . $c++; }
        }
        $hotel->update($v);
        return response()->json(['message' => 'Cập nhật thành công', 'hotel' => $hotel->fresh()->load('category', 'area.city')]);
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        $hotel = Hotel::findOrFail($id);
        if (!$request->user()->isAdmin() && $hotel->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Không có quyền'], 403);
        }
        $active = $hotel->bookings()->active()->count();
        if ($active > 0) {
            return response()->json(['message' => "Còn {$active} đặt phòng đang hoạt động"], 422);
        }
        $hotel->delete();
        return response()->json(['message' => 'Xóa khách sạn thành công']);
    }

    public function destinations(): JsonResponse
    {
        $cities = City::where('is_popular', true)->where('is_active', true)->orderBy('sort_order')->get();
        return response()->json($cities);
    }
}
