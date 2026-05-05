<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HotelCategory;

class HotelCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Khách sạn 5 sao', 'slug' => 'khach-san-5-sao', 'description' => 'Tiêu chuẩn quốc tế cao cấp nhất', 'sort_order' => 1],
            ['name' => 'Khách sạn 4 sao', 'slug' => 'khach-san-4-sao', 'description' => 'Chất lượng cao với đầy đủ tiện nghi', 'sort_order' => 2],
            ['name' => 'Khách sạn 3 sao', 'slug' => 'khach-san-3-sao', 'description' => 'Tiện nghi tốt, giá hợp lý', 'sort_order' => 3],
            ['name' => 'Resort', 'slug' => 'resort', 'description' => 'Khu nghỉ dưỡng sang trọng', 'sort_order' => 4],
            ['name' => 'Boutique Hotel', 'slug' => 'boutique-hotel', 'description' => 'Khách sạn phong cách độc đáo', 'sort_order' => 5],
            ['name' => 'Homestay', 'slug' => 'homestay', 'description' => 'Trải nghiệm văn hóa địa phương', 'sort_order' => 6],
        ];

        foreach ($categories as $cat) {
            HotelCategory::create(array_merge($cat, ['is_active' => true]));
        }
    }
}
