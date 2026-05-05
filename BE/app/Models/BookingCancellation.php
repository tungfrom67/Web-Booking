<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingCancellation extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'reason',
        'cancelled_by',
        'refund_amount',
        'refund_status',
        'cancelled_at',
        'notes',
    ];

    protected $casts = [
        'refund_amount' => 'decimal:2',
        'cancelled_at' => 'datetime',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function cancelledByUser()
    {
        return $this->belongsTo(User::class, 'cancelled_by');
    }
}
