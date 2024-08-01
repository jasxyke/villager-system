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
        ],
        [
            'name'=>'Multi-Purpose Hall'
        ])->create();

    }
}