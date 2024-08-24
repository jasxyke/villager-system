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
        Amenity::factory(2)
        ->sequence([
            'name'=>'Basketball Court',
            'day_price'=>400.00,
            'night_price'=>450.00,
            'guest_additional_price'=>50.00,
            'extension_price'=>50.00
        ],
        [
            'name'=>'Multi-Purpose Hall',
            'day_price'=>250.00,
            'night_price'=>350.00,
            'guest_additional_price'=>50.00,
            'extension_price'=>50.00
        ])->create();

    }
}