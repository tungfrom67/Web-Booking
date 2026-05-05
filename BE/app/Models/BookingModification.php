<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingModification extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'modified_by',
        'modification_type',
        'old_values',
        'new_values',
        'reason',
        'price_difference',
    ];

    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
        'price_difference' => 'decimal:2',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function modifiedByUser()
    {
        return $this->belongsTo(User::class, 'modified_by');
    }
}
