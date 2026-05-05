<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class RoomController extends Controller
{
    public function index(Request $request, $hotelId): JsonResponse
    {
        $hotel = Hotel::findOrFail($hotelId);
        $query = $hotel->rooms()->with(['roomType', 'images', 'amenities', 'policies']);

        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('room_type_id')) $query->where('room_type_id', $request->room_type_id);
        if ($request->filled('max_occupancy')) $query->where('max_occupancy', '>=', $request->max_occupancy);
        if ($request->filled('min_price')) $query->where('base_price', '>=', $request->min_price);
        if ($request->filled('max_price')) $query->where('base_price', '<=', $request->max_price);

        $rooms = $query->orderBy('base_price')->get();

        return response()->json($rooms);
    }

    public function show($hotelId, $roomId): JsonResponse
    {
        $room = Room::with(['hotel', 'roomType', 'images', 'amenities', 'policies', 'pricing'])
            ->where('hotel_id', $hotelId)
            ->findOrFail($roomId);

        return response()->json($room);
    }

    public function checkAvailability(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'adults' => 'nullable|integer|min:1',
            'children' => 'nullable|integer|min:0',
        ]);

        $checkIn = $validated['check_in'];
        $checkOut = $validated['check_out'];
        $totalGuests = ($validated['adults'] ?? 1) + ($validated['children'] ?? 0);

        $rooms = Room::with(['roomType', 'images', 'amenities', 'policies'])
            ->where('hotel_id', $validated['hotel_id'])
            ->available()
            ->where('max_occupancy', '>=', $totalGuests)
            ->get()
            ->filter(fn($room) => $room->isAvailableForDates($checkIn, $checkOut))
            ->values();

        $nights = \Carbon\Carbon::parse($checkIn)->diffInDays(\Carbon\Carbon::parse($checkOut));

        $rooms->transform(function ($room) use ($nights) {
            $room->nights = $nights;
            $room->total_price = $room->base_price * $nights;
            $room->discounted_total = $room->discountedPrice * $nights;
            return $room;
        });

        return response()->json([
            'available_rooms' => $rooms,
            'check_in' => $checkIn,
            'check_out' => $checkOut,
            'nights' => $nights,
        ]);
    }

    public function store(Request $request, $hotelId): JsonResponse
    {
        $hotel = Hotel::findOrFail($hotelId);
        if (!$request->user()->isAdmin() && $hotel->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Không có quyền'], 403);
        }

        $v = $request->validate([
            'room_type_id' => 'required|exists:room_types,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'room_number' => 'nullable|string|max:50',
            'floor_number' => 'nullable|integer',
            'size_sqm' => 'nullable|integer|min:1',
            'max_occupancy' => 'required|integer|min:1|max:20',
            'bed_configuration' => 'nullable|string|max:255',
            'base_price' => 'required|numeric|min:0',
            'weekend_price' => 'nullable|numeric|min:0',
            'holiday_price' => 'nullable|numeric|min:0',
            'discount_percentage' => 'nullable|numeric|min:0|max:100',
        ]);

        $v['hotel_id'] = $hotelId;
        $v['slug'] = Str::slug($v['name']);
        $base = $v['slug']; $c = 1;
        while (Room::where('hotel_id', $hotelId)->where('slug', $v['slug'])->exists()) {
            $v['slug'] = $base . '-' . $c++;
        }

        $room = Room::create($v);
        $hotel->increment('total_rooms');

        return response()->json(['message' => 'Tạo phòng thành công', 'room' => $room->load('roomType')], 201);
    }

    public function update(Request $request, $hotelId, $roomId): JsonResponse
    {
        $hotel = Hotel::findOrFail($hotelId);
        if (!$request->user()->isAdmin() && $hotel->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Không có quyền'], 403);
        }

        $room = Room::where('hotel_id', $hotelId)->findOrFail($roomId);

        $v = $request->validate([
            'room_type_id' => 'sometimes|exists:room_types,id',
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'size_sqm' => 'nullable|integer|min:1',
            'max_occupancy' => 'sometimes|integer|min:1|max:20',
            'bed_configuration' => 'nullable|string|max:255',
            'base_price' => 'sometimes|numeric|min:0',
            'weekend_price' => 'nullable|numeric|min:0',
            'holiday_price' => 'nullable|numeric|min:0',
            'discount_percentage' => 'nullable|numeric|min:0|max:100',
            'is_featured' => 'sometimes|boolean',
            'is_active' => 'sometimes|boolean',
            'status' => 'sometimes|in:available,occupied,maintenance,out_of_order',
        ]);

        if (isset($v['name'])) {
            $v['slug'] = Str::slug($v['name']);
            $base = $v['slug']; $c = 1;
            while (Room::where('hotel_id', $hotelId)->where('slug', $v['slug'])->where('id', '!=', $roomId)->exists()) {
                $v['slug'] = $base . '-' . $c++;
            }
        }

        $room->update($v);
        return response()->json(['message' => 'Cập nhật phòng thành công', 'room' => $room->fresh()->load('roomType')]);
    }

    public function destroy(Request $request, $hotelId, $roomId): JsonResponse
    {
        $hotel = Hotel::findOrFail($hotelId);
        if (!$request->user()->isAdmin() && $hotel->owner_id !== $request->user()->id) {
            return response()->json(['message' => 'Không có quyền'], 403);
        }

        $room = Room::where('hotel_id', $hotelId)->findOrFail($roomId);
        $activeBookings = $room->bookingRooms()->whereHas('booking', fn($q) => $q->active())->count();
        if ($activeBookings > 0) {
            return response()->json(['message' => 'Phòng đang có đặt phòng hoạt động'], 422);
        }

        $room->delete();
        $hotel->decrement('total_rooms');
        return response()->json(['message' => 'Xóa phòng thành công']);
    }
}
