<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'description',
        'icon',
        'is_active',
        'sort_order',
        'config',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'config' => 'array',
    ];

    public function transactions()
    {
        return $this->hasMany(PaymentTransaction::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }
}
