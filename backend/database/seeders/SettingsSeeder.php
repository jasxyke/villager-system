<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            ['key' => 'allow_miss_payments', 'value' => true],
            ['key' => 'bill_amount_per_month', 'value' => '1000'],
            ['key' => 'additional_per_missed_payment', 'value' => '100'],
            ['key' => 'payment_per_square_meter', 'value' => '50'],
            ['key' => 'payment_per_car_sticker', 'value' => '200'],
            ['key' => 'payment_for_guest_car_permits', 'value' => '150'],
            ['key' => 'processing_fee', 'value' => '100'],
            ['key' => 'village_blocks', 'value' => '10'],
        ];

        DB::table('settings')->insert($settings);
    }
}