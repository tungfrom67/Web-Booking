<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RoomType;

class RoomTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => 'Standard', 'slug' => 'standard', 'description' => 'Phòng tiêu chuẩn', 'sort_order' => 1],
            ['name' => 'Superior', 'slug' => 'superior', 'description' => 'Phòng cao cấp', 'sort_order' => 2],
            ['name' => 'Deluxe', 'slug' => 'deluxe', 'description' => 'Phòng sang trọng', 'sort_order' => 3],
            ['name' => 'Suite', 'slug' => 'suite', 'description' => 'Phòng suite đẳng cấp', 'sort_order' => 4],
            ['name' => 'Executive', 'slug' => 'executive', 'description' => 'Phòng executive dành cho doanh nhân', 'sort_order' => 5],
            ['name' => 'Presidential Suite', 'slug' => 'presidential-suite', 'description' => 'Phòng tổng thống', 'sort_order' => 6],
            ['name' => 'Villa', 'slug' => 'villa', 'description' => 'Biệt thự riêng biệt', 'sort_order' => 7],
            ['name' => 'Bungalow', 'slug' => 'bungalow', 'description' => 'Bungalow giữa thiên nhiên', 'sort_order' => 8],
        ];

        foreach ($types as $type) {
            RoomType::create($type);
        }
    }
}
