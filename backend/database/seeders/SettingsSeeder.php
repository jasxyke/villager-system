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
            //bills settings
            ['key' => 'allow_miss_payments', 'value' => true],
            ['key' => 'bill_amount_per_month', 'value' => 100],
            // ['key' => 'additional_per_missed_payment', 'value' => 100],
            ['key' => 'interest_per_missed_payment', 'value' => 2],
            // ['key' => 'payment_per_square_meter', 'value' => 50],
            //E-WALLET
            ['key' => 'e_wallet_number', 'value' => ''],
            ['key' => 'e_wallet_pic_path', 'value' => ''],
            ['key' => 'e_wallet_pic_url', 'value' => ''],
            
            //car sticker fees
            ['key' => 'payment_per_car_sticker_two_wheel', 'value' => 200],
            ['key' => 'payment_per_car_sticker_four_wheel', 'value' => 400],
            ['key' => 'payment_per_car_sticker_delivery_truck', 'value' => 600],
            ['key' => 'payment_per_car_sticker_pass_through', 'value' => 500],
            // ['key' => 'payment_for_guest_car_permits', 'value' => 150],
            
            //clearance fees
            ['key' => 'building_clearance_fee', 'value' => 100],
            ['key' => 'construction_clearance_fee', 'value' => 100],
            ['key' => 'processing_fee', 'value' => 100],

            //general village settings
            ['key' => 'village_name', 'value' => 'PAMAHAY VILLAGE HOMEOWNERS ASSOCIATION'],
            ['key' => 'village_address', 'value' => 'Barangay San Jose, Rodriguez Rizal'],
            ['key' => 'village_contact_number_1', 'value' => '0908-173-3190'],
            ['key' => 'village_contact_number_2', 'value' => '0921-271-3846'],
            ['key' => 'village_email', 'value' => 'pamahayvillage.hoa@gmail.com'],
            ['key' => 'village_hoa_reg_num', 'value' => 'HLURB No. NCR-HOA 17-0212'],
            ['key' => 'village_tin_no', 'value' => '44-966-234-00000'],
            ['key' => 'village_blocks', 'value' => '10'],
            ['key' => 'logo_1_path', 'value' => ''],
            ['key' => 'logo_1_url', 'value' => ''],
            ['key' => 'logo_2_path', 'value' => ''],
            ['key' => 'logo_2_url', 'value' => ''],

        ];

        DB::table('settings')->insert($settings);
    }
}