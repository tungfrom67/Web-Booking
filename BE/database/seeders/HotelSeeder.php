<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Hotel;
use App\Models\Room;
use App\Models\HotelImage;
use App\Models\RoomImage;
use App\Models\RoomPolicy;
use App\Models\Amenity;
use App\Models\Area;
use App\Models\HotelCategory;
use App\Models\RoomType;
use App\Models\User;

class HotelSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('user_type', 'admin')->first();
        $cat5 = HotelCategory::where('slug', 'khach-san-5-sao')->first();
        $catResort = HotelCategory::where('slug', 'resort')->first();
        $deluxe = RoomType::where('slug', 'deluxe')->first();
        $suite = RoomType::where('slug', 'suite')->first();
        $executive = RoomType::where('slug', 'executive')->first();

        $generalAmenities = Amenity::where('category', 'general')->pluck('id')->toArray();
        $roomAmenities = Amenity::where('category', 'room')->pluck('id')->toArray();

        $hotels = [
            [
                'name' => 'Furama Resort Đà Nẵng',
                'slug' => 'furama-resort-da-nang',
                'category_id' => $catResort->id,
                'area' => 'Ngũ Hành Sơn',
                'type' => 'resort',
                'address' => '105 Võ Nguyên Giáp, Ngũ Hành Sơn, Đà Nẵng',
                'description' => 'Furama Resort Đà Nẵng là khu nghỉ dưỡng 5 sao sang trọng, tọa lạc tại bãi biển Đà Nẵng. Với kiến trúc Đông Dương độc đáo, khu nghỉ dưỡng mang đến không gian nghỉ ngơi thanh bình và đẳng cấp.',
                'short_description' => 'Khu nghỉ dưỡng 5 sao bên bờ biển Đà Nẵng',
                'star_rating' => 5.0, 'review_rating' => 4.8, 'review_count' => 256,
                'latitude' => 16.0320, 'longitude' => 108.2460,
                'phone' => '0236 3847 333', 'email' => 'reservation@furamavietnam.com',
                'total_rooms' => 198, 'is_featured' => true, 'status' => 'active',
                'rooms' => [
                    ['name' => 'Phòng Deluxe Hướng Vườn', 'type' => $deluxe->id, 'price' => 3500000, 'discount' => 15, 'size' => 40, 'max' => 2, 'bed' => '1 giường King hoặc 2 giường đơn'],
                    ['name' => 'Phòng Deluxe Hướng Biển', 'type' => $deluxe->id, 'price' => 4500000, 'discount' => 10, 'size' => 40, 'max' => 2, 'bed' => '1 giường King hoặc 2 giường đơn'],
                    ['name' => 'Ocean Suite', 'type' => $suite->id, 'price' => 8500000, 'discount' => 15, 'size' => 85, 'max' => 4, 'bed' => '1 giường King và 1 giường sofa'],
                ],
            ],
            [
                'name' => 'Vinpearl Resort & Spa Nha Trang',
                'slug' => 'vinpearl-resort-nha-trang',
                'category_id' => $catResort->id,
                'area' => 'Trung tâm Nha Trang',
                'type' => 'resort',
                'address' => 'Đảo Hòn Tre, Nha Trang, Khánh Hòa',
                'description' => 'Vinpearl Resort & Spa Nha Trang nằm trên đảo Hòn Tre xinh đẹp, sở hữu bãi biển riêng với cát trắng mịn. Khu nghỉ dưỡng cung cấp 485 phòng nghỉ sang trọng cùng các tiện nghi đẳng cấp.',
                'short_description' => 'Khu nghỉ dưỡng 5 sao trên đảo riêng Nha Trang',
                'star_rating' => 5.0, 'review_rating' => 4.8, 'review_count' => 412,
                'latitude' => 12.2172, 'longitude' => 109.2100,
                'phone' => '0258 3598 188', 'email' => 'info@vinpearl.com',
                'total_rooms' => 485, 'is_featured' => true, 'status' => 'active',
                'rooms' => [
                    ['name' => 'Phòng Deluxe', 'type' => $deluxe->id, 'price' => 2500000, 'discount' => 15, 'size' => 45, 'max' => 2, 'bed' => '1 giường King hoặc 2 giường đơn'],
                    ['name' => 'Phòng Deluxe Hướng Biển', 'type' => $deluxe->id, 'price' => 3000000, 'discount' => 10, 'size' => 45, 'max' => 2, 'bed' => '1 giường King hoặc 2 giường đơn'],
                    ['name' => 'Executive Suite', 'type' => $suite->id, 'price' => 5000000, 'discount' => 15, 'size' => 90, 'max' => 4, 'bed' => '1 giường King và 1 giường sofa'],
                ],
            ],
            [
                'name' => 'JW Marriott Hotel Hanoi',
                'slug' => 'jw-marriott-hanoi',
                'category_id' => $cat5->id,
                'area' => 'Nam Từ Liêm',
                'type' => 'hotel',
                'address' => '8 Đỗ Đức Dục, Mễ Trì, Nam Từ Liêm, Hà Nội',
                'description' => 'JW Marriott Hotel Hanoi là khách sạn 5 sao sang trọng với kiến trúc hiện đại lấy cảm hứng từ hình dáng con rồng. Sở hữu 450 phòng nghỉ sang trọng với nội thất tinh tế.',
                'short_description' => 'Khách sạn 5 sao sang trọng tại Hà Nội',
                'star_rating' => 5.0, 'review_rating' => 4.9, 'review_count' => 380,
                'latitude' => 21.0186, 'longitude' => 105.7810,
                'phone' => '024 3833 5588', 'email' => 'info@jwmarriothanoi.com',
                'total_rooms' => 450, 'is_featured' => true, 'status' => 'active',
                'rooms' => [
                    ['name' => 'Phòng Deluxe', 'type' => $deluxe->id, 'price' => 3200000, 'discount' => 10, 'size' => 48, 'max' => 2, 'bed' => '1 giường King hoặc 2 giường đơn'],
                    ['name' => 'Phòng Executive', 'type' => $executive->id, 'price' => 4500000, 'discount' => 10, 'size' => 48, 'max' => 2, 'bed' => '1 giường King hoặc 2 giường đơn'],
                    ['name' => 'JW Suite', 'type' => $suite->id, 'price' => 7000000, 'discount' => 10, 'size' => 84, 'max' => 3, 'bed' => '1 giường King'],
                ],
            ],
            [
                'name' => 'InterContinental Phu Quoc',
                'slug' => 'intercontinental-phu-quoc',
                'category_id' => $catResort->id,
                'area' => 'Bãi Trường',
                'type' => 'resort',
                'address' => 'Bãi Trường, Dương Tơ, Phú Quốc, Kiên Giang',
                'description' => 'InterContinental Phu Quoc Long Beach Resort tọa lạc trên bãi biển Bãi Trường tuyệt đẹp, mang đến trải nghiệm nghỉ dưỡng đẳng cấp quốc tế giữa thiên nhiên hoang sơ.',
                'short_description' => 'Resort đẳng cấp quốc tế tại Phú Quốc',
                'star_rating' => 5.0, 'review_rating' => 4.7, 'review_count' => 198,
                'latitude' => 10.1680, 'longitude' => 103.9590,
                'phone' => '0297 3978 888', 'email' => 'info@icphuquoc.com',
                'total_rooms' => 459, 'is_featured' => true, 'status' => 'active',
                'rooms' => [
                    ['name' => 'Classic Room', 'type' => $deluxe->id, 'price' => 4000000, 'discount' => 20, 'size' => 50, 'max' => 2, 'bed' => '1 giường King'],
                    ['name' => 'Ocean View Suite', 'type' => $suite->id, 'price' => 7500000, 'discount' => 15, 'size' => 75, 'max' => 3, 'bed' => '1 giường King'],
                ],
            ],
            [
                'name' => 'Park Hyatt Saigon',
                'slug' => 'park-hyatt-saigon',
                'category_id' => $cat5->id,
                'area' => 'Quận 1',
                'type' => 'hotel',
                'address' => '2 Công Trường Lam Sơn, Bến Nghé, Quận 1, TP.HCM',
                'description' => 'Park Hyatt Saigon là khách sạn sang trọng bậc nhất TP.HCM, tọa lạc ngay trung tâm thành phố với kiến trúc Pháp cổ điển thanh lịch.',
                'short_description' => 'Khách sạn sang trọng bậc nhất Sài Gòn',
                'star_rating' => 5.0, 'review_rating' => 4.9, 'review_count' => 340,
                'latitude' => 10.7769, 'longitude' => 106.7032,
                'phone' => '028 3824 1234', 'email' => 'saigon.park@hyatt.com',
                'total_rooms' => 245, 'is_featured' => true, 'status' => 'active',
                'rooms' => [
                    ['name' => 'Park Room', 'type' => $deluxe->id, 'price' => 5500000, 'discount' => 10, 'size' => 46, 'max' => 2, 'bed' => '1 giường King'],
                    ['name' => 'Park Suite', 'type' => $suite->id, 'price' => 12000000, 'discount' => 5, 'size' => 92, 'max' => 3, 'bed' => '1 giường King'],
                ],
            ],
            [
                'name' => 'Dalat Palace Heritage Hotel',
                'slug' => 'dalat-palace-heritage',
                'category_id' => $cat5->id,
                'area' => 'Trung tâm Đà Lạt',
                'type' => 'hotel',
                'address' => '12 Trần Phú, Phường 3, Đà Lạt, Lâm Đồng',
                'description' => 'Dalat Palace Heritage Hotel là khách sạn lịch sử mang phong cách kiến trúc Pháp, tọa lạc bên hồ Xuân Hương thơ mộng.',
                'short_description' => 'Khách sạn di sản phong cách Pháp bên hồ Xuân Hương',
                'star_rating' => 5.0, 'review_rating' => 4.6, 'review_count' => 156,
                'latitude' => 11.9385, 'longitude' => 108.4376,
                'phone' => '0263 3825 444', 'email' => 'info@dalatpalace.com',
                'total_rooms' => 43, 'is_featured' => true, 'status' => 'active',
                'rooms' => [
                    ['name' => 'Deluxe Lake View', 'type' => $deluxe->id, 'price' => 2800000, 'discount' => 10, 'size' => 35, 'max' => 2, 'bed' => '1 giường King'],
                    ['name' => 'Royal Suite', 'type' => $suite->id, 'price' => 6000000, 'discount' => 10, 'size' => 70, 'max' => 3, 'bed' => '1 giường King'],
                ],
            ],
        ];

        foreach ($hotels as $hotelData) {
            $area = Area::where('slug', \Illuminate\Support\Str::slug($hotelData['area']))->first();
            if (!$area) {
                $area = Area::first();
            }

            $roomsData = $hotelData['rooms'];
            unset($hotelData['rooms'], $hotelData['area']);

            $hotel = Hotel::create(array_merge($hotelData, [
                'area_id' => $area->id,
                'owner_id' => $admin->id,
                'is_verified' => true,
                'is_active' => true,
                'check_in_time' => '14:00:00',
                'check_out_time' => '12:00:00',
            ]));

            // Attach amenities
            $hotel->amenities()->attach(array_slice($generalAmenities, 0, rand(5, count($generalAmenities))));

            // Create hotel images
            for ($i = 1; $i <= 5; $i++) {
                HotelImage::create([
                    'hotel_id' => $hotel->id,
                    'image_url' => "/placeholder.svg?height=600&width=800&text=" . urlencode($hotel->name) . "+{$i}",
                    'caption' => "{$hotel->name} - Ảnh {$i}",
                    'is_primary' => $i === 1,
                    'sort_order' => $i,
                ]);
            }

            // Create rooms
            foreach ($roomsData as $rd) {
                $room = Room::create([
                    'hotel_id' => $hotel->id,
                    'room_type_id' => $rd['type'],
                    'name' => $rd['name'],
                    'slug' => \Illuminate\Support\Str::slug($rd['name']),
                    'description' => "Phòng {$rd['name']} có diện tích {$rd['size']}m² với thiết kế sang trọng và đầy đủ tiện nghi cao cấp.",
                    'size_sqm' => $rd['size'],
                    'max_occupancy' => $rd['max'],
                    'bed_configuration' => $rd['bed'],
                    'base_price' => $rd['price'],
                    'discount_percentage' => $rd['discount'],
                    'is_active' => true,
                    'is_featured' => $rd['price'] > 5000000,
                    'status' => 'available',
                ]);

                // Attach room amenities
                $room->amenities()->attach(array_slice($roomAmenities, 0, rand(3, count($roomAmenities))));

                // Create room images
                for ($i = 1; $i <= 3; $i++) {
                    RoomImage::create([
                        'room_id' => $room->id,
                        'image_url' => "/placeholder.svg?height=400&width=600&text=" . urlencode($rd['name']) . "+{$i}",
                        'caption' => "{$rd['name']} - Ảnh {$i}",
                        'is_primary' => $i === 1,
                        'sort_order' => $i,
                    ]);
                }

                // Create room policies
                $policies = [
                    ['policy_type' => 'smoking', 'description' => 'Không hút thuốc', 'is_allowed' => false],
                    ['policy_type' => 'pets', 'description' => 'Không mang thú cưng', 'is_allowed' => false],
                    ['policy_type' => 'cancellation', 'description' => 'Hủy phòng miễn phí trước 3 ngày', 'is_allowed' => true],
                    ['policy_type' => 'breakfast', 'description' => 'Bữa sáng miễn phí', 'is_allowed' => true],
                ];
                foreach ($policies as $p) {
                    RoomPolicy::create(array_merge($p, ['room_id' => $room->id]));
                }
            }
        }
    }
}
