<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'category',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function hotels()
    {
        return $this->belongsToMany(Hotel::class, 'hotel_amenities')->withTimestamps();
    }

    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'room_amenities')->withTimestamps();
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }
}
