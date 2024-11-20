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
            ['key' => 'village_name', 'value' => 'PAMAHAY VILLAGE HOMEOWNERS ASSOCIATION'],
            ['key' => 'village_address', 'value' => 'Barangay San Jose, Rodriguez Rizal'],
            ['key' => 'village_contact_number_1', 'value' => '0908-173-3190'],
            ['key' => 'village_contact_number_2', 'value' => '0921-271-3846'],
            ['key' => 'village_email', 'value' => 'pamahayvillage.hoa@gmail.com'],
            ['key' => 'village_hoa_reg_num', 'value' => 'HLURB No. NCR-HOA 17-0212'],
            ['key' => 'village_tin_no', 'value' => '44-966-234-00000'],
            ['key' => 'village_blocks', 'value' => '10'],
            ['key' => 'village_logo_path', 'value' => ''],
            ['key' => 'village_logo_url', 'value' => ''],
            ['key' => 'city_logo_path', 'value' => ''],
            ['key' => 'city_logo_url', 'value' => ''],
        ];

        DB::table('settings')->insert($settings);
    }
}