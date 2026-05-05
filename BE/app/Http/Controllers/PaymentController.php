<?php

namespace App\Http\Controllers;

use App\Models\PaymentTransaction;
use App\Models\PaymentMethod;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function methods(): JsonResponse
    {
        $methods = PaymentMethod::active()->get();
        return response()->json($methods);
    }

    public function process(Request $request): JsonResponse
    {
        $v = $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'amount' => 'required|numeric|min:0',
        ]);

        $booking = Booking::findOrFail($v['booking_id']);
        if ($booking->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Không có quyền'], 403);
        }

        if ($booking->payment_status === 'paid') {
            return response()->json(['message' => 'Đặt phòng đã được thanh toán'], 422);
        }

        $transaction = PaymentTransaction::create([
            'booking_id' => $booking->id,
            'user_id' => $request->user()->id,
            'payment_method_id' => $v['payment_method_id'],
            'transaction_code' => 'TXN-' . strtoupper(Str::random(12)),
            'amount' => $v['amount'],
            'currency' => $booking->currency,
            'status' => 'completed', // In production: 'pending' until gateway confirms
            'payment_gateway' => 'internal',
            'paid_at' => now(),
        ]);

        // Update booking payment status
        $totalPaid = PaymentTransaction::where('booking_id', $booking->id)->paid()->sum('amount');
        if ($totalPaid >= $booking->total_amount) {
            $booking->update(['payment_status' => 'paid', 'status' => 'confirmed', 'confirmed_at' => now()]);
        } else {
            $booking->update(['payment_status' => 'partially_paid']);
        }

        return response()->json([
            'message' => 'Thanh toán thành công',
            'transaction' => $transaction,
            'booking' => $booking->fresh(),
        ]);
    }

    public function status($bookingId): JsonResponse
    {
        $transactions = PaymentTransaction::where('booking_id', $bookingId)
            ->with('paymentMethod')
            ->latest()
            ->get();

        $booking = Booking::findOrFail($bookingId);
        $totalPaid = $transactions->where('status', 'completed')->sum('amount');

        return response()->json([
            'transactions' => $transactions,
            'total_amount' => $booking->total_amount,
            'total_paid' => $totalPaid,
            'remaining' => max(0, $booking->total_amount - $totalPaid),
            'payment_status' => $booking->payment_status,
        ]);
    }
}
