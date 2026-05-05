<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoyaltyTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'loyalty_program_id',
        'booking_id',
        'points',
        'transaction_type',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function loyaltyProgram()
    {
        return $this->belongsTo(LoyaltyProgram::class);
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
