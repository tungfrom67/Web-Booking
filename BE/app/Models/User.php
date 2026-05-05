<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'date_of_birth',
        'gender',
        'nationality',
        'address',
        'avatar',
        'user_type',
        'status',
        'is_vip',
        'language',
        'timezone',
        'last_login_at',
        'login_count',
        'provider',
        'provider_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'provider_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'date_of_birth' => 'date',
        'is_vip' => 'boolean',
        'last_login_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Get the user's full name.
     */
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    /**
     * Check if user is admin.
     */
    public function isAdmin(): bool
    {
        return $this->user_type === 'admin';
    }

    /**
     * Check if user is manager.
     */
    public function isManager(): bool
    {
        return $this->user_type === 'manager';
    }

    /**
     * Check if user is staff.
     */
    public function isStaff(): bool
    {
        return in_array($this->user_type, ['admin', 'manager', 'staff']);
    }

    // ─── Relationships ───────────────────────────────────────

    /**
     * Hotels owned by this user (partner/admin).
     */
    public function ownedHotels()
    {
        return $this->hasMany(Hotel::class, 'owner_id');
    }

    /**
     * Bookings made by this user.
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Reviews written by this user.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * User's favorite hotels.
     */
    public function favoriteHotels()
    {
        return $this->belongsToMany(Hotel::class, 'user_favorites')->withTimestamps();
    }

    /**
     * User's loyalty program entries.
     */
    public function loyaltyPrograms()
    {
        return $this->belongsToMany(LoyaltyProgram::class, 'user_loyalty')
            ->withPivot('points_balance', 'tier_level', 'join_date')
            ->withTimestamps();
    }

    /**
     * Notifications for this user.
     */
    public function notificationRecipients()
    {
        return $this->hasMany(NotificationRecipient::class);
    }

    /**
     * User's payment methods.
     */
    public function paymentMethods()
    {
        return $this->hasMany(UserPaymentMethod::class);
    }

    /**
     * User's search history.
     */
    public function searchHistory()
    {
        return $this->hasMany(SearchHistory::class);
    }

    /**
     * User's activity logs.
     */
    public function activityLogs()
    {
        return $this->hasMany(UserActivityLog::class);
    }

    /**
     * Wishlists created by this user.
     */
    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }
}
