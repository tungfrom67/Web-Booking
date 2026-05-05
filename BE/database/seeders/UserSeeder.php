<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'Henry XII',
            'email' => 'admin@henryxii.com',
            'password' => Hash::make('password123'),
            'phone' => '0901234567',
            'user_type' => 'admin',
            'status' => 'active',
            'is_vip' => true,
            'language' => 'vi',
            'timezone' => 'Asia/Ho_Chi_Minh',
            'email_verified_at' => now(),
        ]);

        User::create([
            'first_name' => 'Nguyễn Văn',
            'last_name' => 'Khách',
            'email' => 'customer@henryxii.com',
            'password' => Hash::make('password123'),
            'phone' => '0912345678',
            'user_type' => 'customer',
            'status' => 'active',
            'language' => 'vi',
            'timezone' => 'Asia/Ho_Chi_Minh',
            'email_verified_at' => now(),
        ]);

        User::create([
            'first_name' => 'Trần Thị',
            'last_name' => 'Partner',
            'email' => 'partner@henryxii.com',
            'password' => Hash::make('password123'),
            'phone' => '0923456789',
            'user_type' => 'partner',
            'status' => 'active',
            'language' => 'vi',
            'timezone' => 'Asia/Ho_Chi_Minh',
            'email_verified_at' => now(),
        ]);
    }
}
