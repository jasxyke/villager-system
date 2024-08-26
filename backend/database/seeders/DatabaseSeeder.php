<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       $this->call([
            UserSeeder::class,
            AmenitySeeder::class,
            AnnouncementSeeder::class,
            // ResidentSeeder::class,
            BookingSeeder::class,
            HouseSeeder::class
       ]);
    }
}