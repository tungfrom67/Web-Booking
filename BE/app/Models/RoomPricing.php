<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomPricing extends Model
{
    use HasFactory;

    protected $table = 'room_pricing';

    protected $fillable = [
        'room_id',
        'date_from',
        'date_to',
        'price',
        'pricing_type',
        'notes',
    ];

    protected $casts = [
        'date_from' => 'date',
        'date_to' => 'date',
        'price' => 'decimal:2',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
