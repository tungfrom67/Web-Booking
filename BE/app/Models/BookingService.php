<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingService extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'service_id',
        'quantity',
        'unit_price',
        'total_price',
        'service_date',
        'notes',
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'service_date' => 'date',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function service()
    {
        return $this->belongsTo(AdditionalService::class, 'service_id');
    }
}
