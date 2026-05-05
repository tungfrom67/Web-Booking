<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\BookingRoom;
use App\Models\Hotel;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Booking::with(['hotel.images', 'rooms.room', 'hotel.area.city'])
            ->where('user_id', $request->user()->id);

        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('payment_status')) $query->where('payment_status', $request->payment_status);

        $bookings = $query->latest()->paginate(min((int) $request->get('per_page', 10), 50));
        return response()->json($bookings);
    }

    public function show(Request $request, $id): JsonResponse
    {
        $booking = Booking::with([
            'hotel.images', 'hotel.area.city',
            'rooms.room.roomType', 'rooms.room.images',
            'services.service', 'payments', 'review',
        ])->findOrFail($id);

        if ($booking->user_id !== $request->user()->id && !$request->user()->isStaff()) {
            return response()->json(['message' => 'Không có quyền xem đặt phòng này'], 403);
        }

        return response()->json($booking);
    }

    public function store(Request $request): JsonResponse
    {
        $v = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'rooms' => 'required|array|min:1',
            'rooms.*.room_id' => 'required|exists:rooms,id',
            'rooms.*.quantity' => 'nullable|integer|min:1|max:5',
            'check_in_date' => 'required|date|after_or_equal:today',
            'check_out_date' => 'required|date|after:check_in_date',
            'adults' => 'required|integer|min:1|max:20',
            'children' => 'nullable|integer|min:0|max:10',
            'guest_name' => 'required|string|max:255',
            'guest_email' => 'required|email|max:255',
            'guest_phone' => 'required|string|max:20',
            'special_requests' => 'nullable|string|max:1000',
            'promotion_code' => 'nullable|string|max:50',
        ]);

        $hotel = Hotel::active()->findOrFail($v['hotel_id']);
        $checkIn = Carbon::parse($v['check_in_date']);
        $checkOut = Carbon::parse($v['check_out_date']);
        $nights = $checkIn->diffInDays($checkOut);

        if ($nights < 1) {
            return response()->json(['message' => 'Số đêm phải ít nhất 1'], 422);
        }

        // Validate rooms availability
        $roomTotal = 0;
        $bookingRooms = [];

        foreach ($v['rooms'] as $roomData) {
            $room = Room::where('hotel_id', $v['hotel_id'])->findOrFail($roomData['room_id']);

            if (!$room->isAvailableForDates($v['check_in_date'], $v['check_out_date'])) {
                return response()->json([
                    'message' => "Phòng '{$room->name}' không còn trống trong khoảng thời gian này",
                ], 422);
            }

            $qty = $roomData['quantity'] ?? 1;
            $pricePerNight = $room->discountedPrice;
            $totalPrice = $pricePerNight * $nights * $qty;
            $roomTotal += $totalPrice;

            $bookingRooms[] = [
                'room_id' => $room->id,
                'quantity' => $qty,
                'price_per_night' => $pricePerNight,
                'total_price' => $totalPrice,
                'guest_name' => $v['guest_name'],
            ];
        }

        // Calculate totals
        $taxRate = 0.1; // 10% VAT
        $taxAmount = round($roomTotal * $taxRate, 2);
        $discountAmount = 0;

        // Apply promotion
        $promotionId = null;
        if (!empty($v['promotion_code'])) {
            $promotion = \App\Models\Promotion::where('code', $v['promotion_code'])->first();
            if ($promotion && $promotion->isValid()) {
                $discountAmount = $promotion->calculateDiscount($roomTotal);
                $promotionId = $promotion->id;
                $promotion->increment('used_count');
            }
        }

        $totalAmount = $roomTotal + $taxAmount - $discountAmount;

        // Create booking
        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'hotel_id' => $v['hotel_id'],
            'check_in_date' => $v['check_in_date'],
            'check_out_date' => $v['check_out_date'],
            'nights' => $nights,
            'adults' => $v['adults'],
            'children' => $v['children'] ?? 0,
            'guest_name' => $v['guest_name'],
            'guest_email' => $v['guest_email'],
            'guest_phone' => $v['guest_phone'],
            'special_requests' => $v['special_requests'] ?? null,
            'room_total' => $roomTotal,
            'service_total' => 0,
            'tax_amount' => $taxAmount,
            'discount_amount' => $discountAmount,
            'total_amount' => $totalAmount,
            'currency' => 'VND',
            'promotion_id' => $promotionId,
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        // Create booking rooms
        foreach ($bookingRooms as $br) {
            $br['booking_id'] = $booking->id;
            BookingRoom::create($br);
        }

        return response()->json([
            'message' => 'Đặt phòng thành công',
            'booking' => $booking->load(['hotel', 'rooms.room']),
        ], 201);
    }

    public function cancel(Request $request, $id): JsonResponse
    {
        $booking = Booking::findOrFail($id);

        if ($booking->user_id !== $request->user()->id && !$request->user()->isStaff()) {
            return response()->json(['message' => 'Không có quyền'], 403);
        }

        if (!$booking->isCancellable()) {
            return response()->json(['message' => 'Đặt phòng này không thể hủy'], 422);
        }

        $booking->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'cancelled_by' => $request->user()->id,
            'cancellation_reason' => $request->input('reason', 'Khách hàng yêu cầu hủy'),
        ]);

        \App\Models\BookingCancellation::create([
            'booking_id' => $booking->id,
            'reason' => $request->input('reason', 'Khách hàng yêu cầu hủy'),
            'cancelled_by' => $request->user()->id,
            'refund_amount' => $booking->total_amount,
            'refund_status' => 'pending',
            'cancelled_at' => now(),
        ]);

        return response()->json(['message' => 'Hủy đặt phòng thành công', 'booking' => $booking->fresh()]);
    }

    public function confirm(Request $request, $id): JsonResponse
    {
        $booking = Booking::findOrFail($id);

        if (!$booking->isPending()) {
            return response()->json(['message' => 'Chỉ có thể xác nhận đặt phòng đang chờ'], 422);
        }

        $booking->update([
            'status' => 'confirmed',
            'confirmed_at' => now(),
            'confirmed_by' => $request->user()->id,
        ]);

        return response()->json(['message' => 'Xác nhận đặt phòng thành công', 'booking' => $booking->fresh()]);
    }

    // Admin: list all bookings
    public function adminIndex(Request $request): JsonResponse
    {
        $query = Booking::with(['user:id,first_name,last_name,email', 'hotel:id,name', 'rooms.room:id,name']);

        if ($request->filled('status')) $query->where('status', $request->status);
        if ($request->filled('hotel_id')) $query->where('hotel_id', $request->hotel_id);
        if ($request->filled('date_from')) $query->where('check_in_date', '>=', $request->date_from);
        if ($request->filled('date_to')) $query->where('check_out_date', '<=', $request->date_to);
        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(fn($q) => $q->where('booking_number', 'LIKE', "%{$s}%")
                ->orWhere('guest_name', 'LIKE', "%{$s}%")
                ->orWhere('guest_email', 'LIKE', "%{$s}%"));
        }

        return response()->json($query->latest()->paginate(min((int) $request->get('per_page', 15), 50)));
    }
}
