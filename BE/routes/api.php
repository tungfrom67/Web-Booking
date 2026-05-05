<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

// ─── Auth ────────────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
Route::post('/auth/google', [AuthController::class, 'handleGoogleToken']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);
Route::get('/auth/facebook', [AuthController::class, 'redirectToFacebook']);
Route::post('/auth/facebook', [AuthController::class, 'handleFacebookToken']);
Route::get('/auth/facebook/callback', [AuthController::class, 'handleFacebookCallback']);

// ─── Public Hotel APIs ───────────────────────────────────
Route::get('/hotels', [HotelController::class, 'index']);
Route::get('/hotels/featured', [HotelController::class, 'featured']);
Route::get('/hotels/destinations', [HotelController::class, 'destinations']);
Route::post('/hotels/search', [HotelController::class, 'search']);
Route::get('/hotels/{id}', [HotelController::class, 'show']);

// ─── Public Room APIs ────────────────────────────────────
Route::get('/hotels/{hotelId}/rooms', [RoomController::class, 'index']);
Route::get('/hotels/{hotelId}/rooms/{roomId}', [RoomController::class, 'show']);
Route::post('/rooms/availability', [RoomController::class, 'checkAvailability']);

// ─── Public Review APIs ──────────────────────────────────
Route::get('/hotels/{hotelId}/reviews', [ReviewController::class, 'index']);

// ─── Public Payment Methods ──────────────────────────────
Route::get('/payment-methods', [PaymentController::class, 'methods']);

// ─── Authenticated User APIs ─────────────────────────────
Route::middleware(['auth:sanctum'])->group(function () {
    // Profile
    Route::post('/profile/update', [AuthController::class, 'updateProfile']);
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Bookings
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::post('/bookings/{id}/cancel', [BookingController::class, 'cancel']);

    // Reviews
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::put('/reviews/{id}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
    Route::post('/reviews/{id}/vote', [ReviewController::class, 'vote']);

    // Payments
    Route::post('/payments/process', [PaymentController::class, 'process']);
    Route::get('/payments/status/{bookingId}', [PaymentController::class, 'status']);
});

// ─── Admin/Manager APIs ──────────────────────────────────
Route::middleware(['auth:sanctum', 'role:admin,manager'])->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index']);

    // Hotel management
    Route::post('/hotels', [HotelController::class, 'store']);
    Route::put('/hotels/{id}', [HotelController::class, 'update']);
    Route::delete('/hotels/{id}', [HotelController::class, 'destroy']);

    // Room management
    Route::post('/hotels/{hotelId}/rooms', [RoomController::class, 'store']);
    Route::put('/hotels/{hotelId}/rooms/{roomId}', [RoomController::class, 'update']);
    Route::delete('/hotels/{hotelId}/rooms/{roomId}', [RoomController::class, 'destroy']);

    // Booking management
    Route::get('/bookings', [BookingController::class, 'adminIndex']);
    Route::post('/bookings/{id}/confirm', [BookingController::class, 'confirm']);

    // Review management
    Route::post('/reviews/{id}/respond', [ReviewController::class, 'respond']);
});