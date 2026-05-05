<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;

class CountrySeeder extends Seeder
{
    public function run(): void
    {
        Country::create([
            'name' => 'Việt Nam',
            'code' => 'VN',
            'phone_code' => '+84',
            'currency' => 'VND',
            'currency_symbol' => '₫',
            'is_active' => true,
        ]);
    }
}
