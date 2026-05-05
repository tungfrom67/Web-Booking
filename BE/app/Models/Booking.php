<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Booking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'booking_number',
        'user_id',
        'hotel_id',
        'check_in_date',
        'check_out_date',
        'nights',
        'adults',
        'children',
        'guest_name',
        'guest_email',
        'guest_phone',
        'special_requests',
        'room_total',
        'service_total',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'currency',
        'promotion_id',
        'status',
        'payment_status',
        'cancellation_reason',
        'cancelled_at',
        'cancelled_by',
        'confirmed_at',
        'confirmed_by',
        'checked_in_at',
        'checked_out_at',
    ];

    protected $casts = [
        'check_in_date' => 'date',
        'check_out_date' => 'date',
        'room_total' => 'decimal:2',
        'service_total' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'cancelled_at' => 'datetime',
        'confirmed_at' => 'datetime',
        'checked_in_at' => 'datetime',
        'checked_out_at' => 'datetime',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($booking) {
            if (empty($booking->booking_number)) {
                $booking->booking_number = self::generateBookingNumber();
            }
        });
    }

    /**
     * Generate a unique booking number.
     */
    public static function generateBookingNumber(): string
    {
        do {
            $number = 'HXI-' . date('Ymd') . '-' . strtoupper(Str::random(6));
        } while (self::where('booking_number', $number)->exists());

        return $number;
    }

    // ─── Relationships ───────────────────────────────────────

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function rooms()
    {
        return $this->hasMany(BookingRoom::class);
    }

    public function services()
    {
        return $this->hasMany(BookingService::class);
    }

    public function promotion()
    {
        return $this->belongsTo(Promotion::class);
    }

    public function cancellation()
    {
        return $this->hasOne(BookingCancellation::class);
    }

    public function modifications()
    {
        return $this->hasMany(BookingModification::class);
    }

    public function payments()
    {
        return $this->hasMany(PaymentTransaction::class);
    }

    public function review()
    {
        return $this->hasOne(Review::class);
    }

    public function cancelledByUser()
    {
        return $this->belongsTo(User::class, 'cancelled_by');
    }

    public function confirmedByUser()
    {
        return $this->belongsTo(User::class, 'confirmed_by');
    }

    // ─── Scopes ──────────────────────────────────────────────

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    public function scopeActive($query)
    {
        return $query->whereIn('status', ['pending', 'confirmed', 'checked_in']);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('check_in_date', '>=', now()->toDateString())
            ->whereIn('status', ['pending', 'confirmed']);
    }

    // ─── Helpers ─────────────────────────────────────────────

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isConfirmed(): bool
    {
        return $this->status === 'confirmed';
    }

    public function isCancellable(): bool
    {
        return in_array($this->status, ['pending', 'confirmed'])
            && $this->check_in_date->isFuture();
    }
}
