<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\BookingPayment;
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
        $booking = Booking::create([
            'amenity_id'=>'1',
            'booking_date'=>'2024-08-27',
            'start_time'=>'13:00',
            'end_time'=>'16:00',
            'full_name'=>'Jaspher',
            'email'=>'jasxyke24.jxc@gmail.com',
            'contact_number'=>'09487834861',
            'booking_status'=>'reserved'
        ]);

        // BookingPayment::create([
        //     'booking_id'=> $booking->id,
        //     'amount'=>
        // ])
    }
}