<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelStatistic extends Model
{
    use HasFactory;

    protected $table = 'hotel_statistics';

    protected $fillable = [
        'hotel_id',
        'date',
        'views',
        'bookings',
        'revenue',
        'occupancy_rate',
    ];

    protected $casts = [
        'date' => 'date',
        'revenue' => 'decimal:2',
        'occupancy_rate' => 'decimal:2',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
}
