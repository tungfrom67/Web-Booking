<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PaymentMethod;

class PaymentMethodSeeder extends Seeder
{
    public function run(): void
    {
        $methods = [
            ['name' => 'Thẻ tín dụng/ghi nợ', 'code' => 'credit_card', 'description' => 'Visa, Mastercard, JCB', 'sort_order' => 1],
            ['name' => 'Chuyển khoản ngân hàng', 'code' => 'bank_transfer', 'description' => 'Chuyển khoản nội địa', 'sort_order' => 2],
            ['name' => 'MoMo', 'code' => 'momo', 'description' => 'Ví điện tử MoMo', 'sort_order' => 3],
            ['name' => 'ZaloPay', 'code' => 'zalopay', 'description' => 'Ví điện tử ZaloPay', 'sort_order' => 4],
            ['name' => 'VNPay', 'code' => 'vnpay', 'description' => 'Cổng thanh toán VNPay', 'sort_order' => 5],
            ['name' => 'Thanh toán tại khách sạn', 'code' => 'pay_at_hotel', 'description' => 'Thanh toán khi nhận phòng', 'sort_order' => 6],
        ];

        foreach ($methods as $method) {
            PaymentMethod::create(array_merge($method, ['is_active' => true]));
        }
    }
}
