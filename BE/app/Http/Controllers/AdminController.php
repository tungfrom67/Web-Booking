<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Booking;
use App\Models\User;
use App\Models\Review;
use App\Models\PaymentTransaction;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $today = Carbon::today();
        $thisMonth = Carbon::now()->startOfMonth();

        // Overview stats
        $stats = [
            'total_hotels' => Hotel::count(),
            'active_hotels' => Hotel::active()->count(),
            'total_rooms' => DB::table('rooms')->count(),
            'total_users' => User::where('user_type', 'customer')->count(),
            'total_bookings' => Booking::count(),
            'active_bookings' => Booking::active()->count(),
            'today_bookings' => Booking::whereDate('created_at', $today)->count(),
            'monthly_revenue' => PaymentTransaction::where('status', 'completed')
                ->where('created_at', '>=', $thisMonth)->sum('amount'),
            'total_revenue' => PaymentTransaction::where('status', 'completed')->sum('amount'),
            'pending_bookings' => Booking::pending()->count(),
            'total_reviews' => Review::count(),
            'avg_rating' => round(Review::approved()->avg('overall_rating') ?? 0, 1),
        ];

        // Recent bookings
        $recentBookings = Booking::with(['user:id,first_name,last_name', 'hotel:id,name'])
            ->latest()
            ->limit(10)
            ->get();

        // Revenue by month (last 6 months)
        $revenueByMonth = PaymentTransaction::where('status', 'completed')
            ->where('created_at', '>=', Carbon::now()->subMonths(6))
            ->select(
                DB::raw('YEAR(created_at) as year'),
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(amount) as total')
            )
            ->groupBy('year', 'month')
            ->orderBy('year')
            ->orderBy('month')
            ->get();

        return response()->json([
            'stats' => $stats,
            'recent_bookings' => $recentBookings,
            'revenue_by_month' => $revenueByMonth,
        ]);
    }
}