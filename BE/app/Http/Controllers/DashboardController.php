<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        // User stats
        $stats = [
            'total_bookings' => $user->bookings()->count(),
            'active_bookings' => $user->bookings()->active()->count(),
            'upcoming_bookings' => $user->bookings()->upcoming()->count(),
            'completed_bookings' => $user->bookings()->where('status', 'checked_out')->count(),
            'total_reviews' => $user->reviews()->count(),
            'total_spent' => $user->bookings()->where('payment_status', 'paid')->sum('total_amount'),
            'favorite_hotels' => $user->favoriteHotels()->count(),
        ];

        // Upcoming bookings
        $upcomingBookings = $user->bookings()
            ->with(['hotel:id,name', 'hotel.images' => fn($q) => $q->where('is_primary', true), 'rooms.room:id,name'])
            ->upcoming()
            ->orderBy('check_in_date')
            ->limit(5)
            ->get();

        // Recent bookings
        $recentBookings = $user->bookings()
            ->with(['hotel:id,name', 'rooms.room:id,name'])
            ->latest()
            ->limit(5)
            ->get();

        return response()->json([
            'user' => $user,
            'stats' => $stats,
            'upcoming_bookings' => $upcomingBookings,
            'recent_bookings' => $recentBookings,
        ]);
    }
}