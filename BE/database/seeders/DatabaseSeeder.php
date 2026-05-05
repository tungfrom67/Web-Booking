<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CountrySeeder::class,
            CitySeeder::class,
            AreaSeeder::class,
            HotelCategorySeeder::class,
            AmenitySeeder::class,
            RoomTypeSeeder::class,
            PaymentMethodSeeder::class,
            UserSeeder::class,
            HotelSeeder::class,
        ]);
    }
}
