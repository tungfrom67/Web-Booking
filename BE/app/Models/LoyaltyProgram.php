<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoyaltyProgram extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'points_per_booking',
        'points_per_currency',
        'min_points_redeem',
        'is_active',
    ];

    protected $casts = [
        'points_per_currency' => 'decimal:4',
        'is_active' => 'boolean',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_loyalty')
            ->withPivot('points_balance', 'tier_level', 'join_date')
            ->withTimestamps();
    }

    public function transactions()
    {
        return $this->hasMany(LoyaltyTransaction::class);
    }
}
