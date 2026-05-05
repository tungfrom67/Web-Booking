<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\City;
use App\Models\Country;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        $vn = Country::where('code', 'VN')->first();

        $cities = [
            ['name' => 'Hà Nội', 'slug' => 'ha-noi', 'description' => 'Thủ đô ngàn năm văn hiến với di sản văn hóa phong phú', 'latitude' => 21.0285, 'longitude' => 105.8542, 'is_popular' => true, 'sort_order' => 1],
            ['name' => 'TP. Hồ Chí Minh', 'slug' => 'ho-chi-minh', 'description' => 'Thành phố năng động, trung tâm kinh tế lớn nhất Việt Nam', 'latitude' => 10.8231, 'longitude' => 106.6297, 'is_popular' => true, 'sort_order' => 2],
            ['name' => 'Đà Nẵng', 'slug' => 'da-nang', 'description' => 'Thành phố đáng sống bên bờ biển miền Trung', 'latitude' => 16.0544, 'longitude' => 108.2022, 'is_popular' => true, 'sort_order' => 3],
            ['name' => 'Nha Trang', 'slug' => 'nha-trang', 'description' => 'Thành phố biển xinh đẹp với vịnh biển hàng đầu thế giới', 'latitude' => 12.2388, 'longitude' => 109.1967, 'is_popular' => true, 'sort_order' => 4],
            ['name' => 'Phú Quốc', 'slug' => 'phu-quoc', 'description' => 'Đảo Ngọc với bãi biển hoang sơ và resort cao cấp', 'latitude' => 10.2270, 'longitude' => 103.9571, 'is_popular' => true, 'sort_order' => 5],
            ['name' => 'Đà Lạt', 'slug' => 'da-lat', 'description' => 'Thành phố ngàn hoa, khí hậu mát mẻ quanh năm', 'latitude' => 11.9404, 'longitude' => 108.4583, 'is_popular' => true, 'sort_order' => 6],
            ['name' => 'Hội An', 'slug' => 'hoi-an', 'description' => 'Phố cổ di sản UNESCO với kiến trúc độc đáo', 'latitude' => 15.8801, 'longitude' => 108.3380, 'is_popular' => true, 'sort_order' => 7],
            ['name' => 'Huế', 'slug' => 'hue', 'description' => 'Cố đô với di sản hoàng gia và ẩm thực tinh tế', 'latitude' => 16.4637, 'longitude' => 107.5909, 'is_popular' => true, 'sort_order' => 8],
            ['name' => 'Hạ Long', 'slug' => 'ha-long', 'description' => 'Vịnh Hạ Long - di sản thiên nhiên thế giới', 'latitude' => 20.9101, 'longitude' => 107.1839, 'is_popular' => true, 'sort_order' => 9],
            ['name' => 'Sapa', 'slug' => 'sapa', 'description' => 'Thị trấn sương mù với ruộng bậc thang tuyệt đẹp', 'latitude' => 22.3364, 'longitude' => 103.8438, 'is_popular' => true, 'sort_order' => 10],
        ];

        foreach ($cities as $city) {
            City::create(array_merge($city, [
                'country_id' => $vn->id,
                'is_active' => true,
            ]));
        }
    }
}
