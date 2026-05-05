<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Review extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'hotel_id',
        'booking_id',
        'overall_rating',
        'cleanliness_rating',
        'service_rating',
        'location_rating',
        'value_rating',
        'title',
        'comment',
        'pros',
        'cons',
        'trip_type',
        'is_verified',
        'is_approved',
        'status',
    ];

    protected $casts = [
        'overall_rating' => 'decimal:1',
        'cleanliness_rating' => 'decimal:1',
        'service_rating' => 'decimal:1',
        'location_rating' => 'decimal:1',
        'value_rating' => 'decimal:1',
        'is_verified' => 'boolean',
        'is_approved' => 'boolean',
    ];

    // ─── Relationships ───────────────────────────────────────

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function responses()
    {
        return $this->hasMany(ReviewResponse::class);
    }

    public function votes()
    {
        return $this->hasMany(ReviewVote::class);
    }

    // ─── Scopes ──────────────────────────────────────────────

    public function scopeApproved($query)
    {
        return $query->where('is_approved', true)->where('status', 'published');
    }

    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    // ─── Helpers ─────────────────────────────────────────────

    public function getHelpfulCountAttribute()
    {
        return $this->votes()->where('vote_type', 'helpful')->count();
    }
}
