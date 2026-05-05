<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Amenity;

class AmenitySeeder extends Seeder
{
    public function run(): void
    {
        $amenities = [
            ['name' => 'Wifi miễn phí', 'slug' => 'wifi', 'icon' => 'wifi', 'category' => 'general'],
            ['name' => 'Hồ bơi', 'slug' => 'ho-boi', 'icon' => 'waves', 'category' => 'general'],
            ['name' => 'Phòng gym', 'slug' => 'phong-gym', 'icon' => 'dumbbell', 'category' => 'general'],
            ['name' => 'Spa', 'slug' => 'spa', 'icon' => 'sparkles', 'category' => 'general'],
            ['name' => 'Nhà hàng', 'slug' => 'nha-hang', 'icon' => 'utensils', 'category' => 'general'],
            ['name' => 'Bãi đậu xe', 'slug' => 'bai-dau-xe', 'icon' => 'car', 'category' => 'general'],
            ['name' => 'Bãi biển riêng', 'slug' => 'bai-bien-rieng', 'icon' => 'sun', 'category' => 'general'],
            ['name' => 'Quầy bar', 'slug' => 'quay-bar', 'icon' => 'wine', 'category' => 'general'],
            ['name' => 'Bữa sáng', 'slug' => 'bua-sang', 'icon' => 'coffee', 'category' => 'general'],
            ['name' => 'Dịch vụ phòng 24/7', 'slug' => 'dich-vu-phong', 'icon' => 'clock', 'category' => 'service'],
            ['name' => 'Đưa đón sân bay', 'slug' => 'dua-don-san-bay', 'icon' => 'plane', 'category' => 'service'],
            ['name' => 'Giặt ủi', 'slug' => 'giat-ui', 'icon' => 'shirt', 'category' => 'service'],
            ['name' => 'Điều hòa', 'slug' => 'dieu-hoa', 'icon' => 'thermometer', 'category' => 'room'],
            ['name' => 'TV màn hình phẳng', 'slug' => 'tv', 'icon' => 'tv', 'category' => 'room'],
            ['name' => 'Mini bar', 'slug' => 'mini-bar', 'icon' => 'glass-water', 'category' => 'room'],
            ['name' => 'Két an toàn', 'slug' => 'ket-an-toan', 'icon' => 'lock', 'category' => 'room'],
            ['name' => 'Bồn tắm', 'slug' => 'bon-tam', 'icon' => 'bath', 'category' => 'room'],
            ['name' => 'Ban công', 'slug' => 'ban-cong', 'icon' => 'door-open', 'category' => 'room'],
        ];

        foreach ($amenities as $i => $amenity) {
            Amenity::create(array_merge($amenity, ['is_active' => true, 'sort_order' => $i + 1]));
        }
    }
}
