<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(10)
        ->create()
        ->each(function ($user){
            Booking::factory(2)
            ->state(['user_id'=>$user->id])
            ->sequence(
                ['amenity_id'=>1],
                ['amenity_id'=>2]
            )->create();
        }); 
    }
}