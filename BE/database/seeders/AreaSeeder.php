<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Area;
use App\Models\City;

class AreaSeeder extends Seeder
{
    public function run(): void
    {
        $areas = [
            'Hà Nội' => [
                ['name' => 'Hoàn Kiếm', 'slug' => 'hoan-kiem'],
                ['name' => 'Ba Đình', 'slug' => 'ba-dinh'],
                ['name' => 'Tây Hồ', 'slug' => 'tay-ho'],
                ['name' => 'Nam Từ Liêm', 'slug' => 'nam-tu-liem'],
            ],
            'TP. Hồ Chí Minh' => [
                ['name' => 'Quận 1', 'slug' => 'quan-1'],
                ['name' => 'Quận 3', 'slug' => 'quan-3'],
                ['name' => 'Quận 7', 'slug' => 'quan-7'],
                ['name' => 'Thủ Đức', 'slug' => 'thu-duc'],
            ],
            'Đà Nẵng' => [
                ['name' => 'Hải Châu', 'slug' => 'hai-chau'],
                ['name' => 'Ngũ Hành Sơn', 'slug' => 'ngu-hanh-son'],
                ['name' => 'Sơn Trà', 'slug' => 'son-tra'],
            ],
            'Nha Trang' => [
                ['name' => 'Trung tâm Nha Trang', 'slug' => 'trung-tam-nha-trang'],
                ['name' => 'Bãi Dài', 'slug' => 'bai-dai'],
            ],
            'Phú Quốc' => [
                ['name' => 'Dương Đông', 'slug' => 'duong-dong'],
                ['name' => 'Bãi Trường', 'slug' => 'bai-truong'],
            ],
            'Đà Lạt' => [
                ['name' => 'Trung tâm Đà Lạt', 'slug' => 'trung-tam-da-lat'],
            ],
            'Hội An' => [
                ['name' => 'Phố cổ Hội An', 'slug' => 'pho-co-hoi-an'],
                ['name' => 'Cửa Đại', 'slug' => 'cua-dai'],
            ],
            'Huế' => [
                ['name' => 'Trung tâm Huế', 'slug' => 'trung-tam-hue'],
            ],
            'Hạ Long' => [
                ['name' => 'Bãi Cháy', 'slug' => 'bai-chay'],
            ],
            'Sapa' => [
                ['name' => 'Trung tâm Sapa', 'slug' => 'trung-tam-sapa'],
            ],
        ];

        foreach ($areas as $cityName => $cityAreas) {
            $city = City::where('name', $cityName)->first();
            if (!$city) continue;

            foreach ($cityAreas as $area) {
                Area::create(array_merge($area, [
                    'city_id' => $city->id,
                    'is_active' => true,
                ]));
            }
        }
    }
}
