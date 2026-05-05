<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlashDeal extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_id',
        'room_id',
        'title',
        'description',
        'original_price',
        'deal_price',
        'discount_percentage',
        'quantity',
        'sold_count',
        'start_time',
        'end_time',
        'is_active',
    ];

    protected $casts = [
        'original_price' => 'decimal:2',
        'deal_price' => 'decimal:2',
        'discount_percentage' => 'decimal:2',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)
            ->where('start_time', '<=', now())
            ->where('end_time', '>=', now())
            ->whereRaw('sold_count < quantity');
    }
}
