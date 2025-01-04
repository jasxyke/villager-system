<?php

namespace Database\Seeders;

use App\Models\Amenity;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Amenity::factory(3)
        ->sequence([
            'name'=>'Basketball Court',
            'is_per_group' => true,
            'day_price'=>400.00,
            'night_price'=>450.00,
            'guest_additional_price'=>50.00,
            'extension_price'=>50.00
        ],
        [
            'name'=>'Multi-Purpose Hall',
            'is_per_group' => true,
            'day_price'=>250.00,
            'night_price'=>350.00,
            'guest_additional_price'=>50.00,
            'extension_price'=>50.00
        ],
        [
            'name'=>'Swimming Pool',
            'is_per_group' => false,
            'day_per_person_price' => 50.00,
            'night_per_person_price' => 100.00,
            'guest_additional_price'=>50.00,
            'extension_price'=>50.00
        ]
        )->create();

    }
}