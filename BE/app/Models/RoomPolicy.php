<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomPolicy extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'policy_type',
        'description',
        'is_allowed',
    ];

    protected $casts = [
        'is_allowed' => 'boolean',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
