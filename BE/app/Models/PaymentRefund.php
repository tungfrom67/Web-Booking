<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentRefund extends Model
{
    use HasFactory;

    protected $fillable = [
        'payment_transaction_id',
        'refund_amount',
        'reason',
        'status',
        'refunded_by',
        'refunded_at',
        'gateway_refund_id',
        'notes',
    ];

    protected $casts = [
        'refund_amount' => 'decimal:2',
        'refunded_at' => 'datetime',
    ];

    public function transaction()
    {
        return $this->belongsTo(PaymentTransaction::class, 'payment_transaction_id');
    }

    public function refundedByUser()
    {
        return $this->belongsTo(User::class, 'refunded_by');
    }
}
