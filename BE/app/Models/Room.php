<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'hotel_id',
        'room_type_id',
        'name',
        'slug',
        'description',
        'room_number',
        'floor_number',
        'size_sqm',
        'max_occupancy',
        'bed_configuration',
        'base_price',
        'weekend_price',
        'holiday_price',
        'discount_percentage',
        'is_featured',
        'is_active',
        'status',
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'weekend_price' => 'decimal:2',
        'holiday_price' => 'decimal:2',
        'discount_percentage' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    // ─── Relationships ───────────────────────────────────────

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function roomType()
    {
        return $this->belongsTo(RoomType::class);
    }

    public function images()
    {
        return $this->hasMany(RoomImage::class);
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class, 'room_amenities')->withTimestamps();
    }

    public function pricing()
    {
        return $this->hasMany(RoomPricing::class);
    }

    public function policies()
    {
        return $this->hasMany(RoomPolicy::class);
    }

    public function bookingRooms()
    {
        return $this->hasMany(BookingRoom::class);
    }

    // ─── Scopes ──────────────────────────────────────────────

    public function scopeAvailable($query)
    {
        return $query->where('status', 'available')->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // ─── Helpers ─────────────────────────────────────────────

    public function getDiscountedPriceAttribute()
    {
        if ($this->discount_percentage > 0) {
            return $this->base_price * (1 - $this->discount_percentage / 100);
        }
        return $this->base_price;
    }

    public function getPrimaryImageAttribute()
    {
        return $this->images()->first()?->image_url;
    }

    /**
     * Check if room is available for given dates.
     */
    public function isAvailableForDates($checkIn, $checkOut): bool
    {
        if ($this->status !== 'available' || !$this->is_active) {
            return false;
        }

        return !$this->bookingRooms()
            ->whereHas('booking', function ($q) use ($checkIn, $checkOut) {
                $q->whereIn('status', ['pending', 'confirmed', 'checked_in'])
                    ->where(function ($q2) use ($checkIn, $checkOut) {
                        $q2->whereBetween('check_in_date', [$checkIn, $checkOut])
                            ->orWhereBetween('check_out_date', [$checkIn, $checkOut])
                            ->orWhere(function ($q3) use ($checkIn, $checkOut) {
                                $q3->where('check_in_date', '<=', $checkIn)
                                    ->where('check_out_date', '>=', $checkOut);
                            });
                    });
            })
            ->exists();
    }
}
