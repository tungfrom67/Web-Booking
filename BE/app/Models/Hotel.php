<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Hotel extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'category_id',
        'area_id',
        'owner_id',
        'type',
        'address',
        'description',
        'short_description',
        'star_rating',
        'review_rating',
        'review_count',
        'latitude',
        'longitude',
        'phone',
        'email',
        'website',
        'check_in_time',
        'check_out_time',
        'total_rooms',
        'is_featured',
        'is_verified',
        'is_active',
        'status',
    ];

    protected $casts = [
        'star_rating' => 'decimal:1',
        'review_rating' => 'decimal:1',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'is_featured' => 'boolean',
        'is_verified' => 'boolean',
        'is_active' => 'boolean',
    ];

    // ─── Relationships ───────────────────────────────────────

    public function category()
    {
        return $this->belongsTo(HotelCategory::class, 'category_id');
    }

    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }

    public function images()
    {
        return $this->hasMany(HotelImage::class);
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class, 'hotel_amenities')->withTimestamps();
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function promotions()
    {
        return $this->hasMany(Promotion::class);
    }

    public function specialOffers()
    {
        return $this->hasMany(SpecialOffer::class);
    }

    public function flashDeals()
    {
        return $this->hasMany(FlashDeal::class);
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'user_favorites')->withTimestamps();
    }

    public function statistics()
    {
        return $this->hasMany(HotelStatistic::class);
    }

    // ─── Scopes ──────────────────────────────────────────────

    public function scopeActive($query)
    {
        return $query->where('status', 'active')->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByArea($query, int $areaId)
    {
        return $query->where('area_id', $areaId);
    }

    public function scopeNearby($query, float $lat, float $lng, float $radiusKm = 10)
    {
        return $query->selectRaw("*, (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance", [$lat, $lng, $lat])
            ->having('distance', '<=', $radiusKm)
            ->orderBy('distance');
    }

    // ─── Helpers ─────────────────────────────────────────────

    public function getMinPriceAttribute()
    {
        return $this->rooms()->min('base_price');
    }

    public function getMaxPriceAttribute()
    {
        return $this->rooms()->max('base_price');
    }

    public function getPrimaryImageAttribute()
    {
        return $this->images()->where('is_primary', true)->first()?->image_url
            ?? $this->images()->first()?->image_url;
    }
}
