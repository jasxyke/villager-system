<?php

namespace Database\Seeders;

use App\Models\Booking;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generate unique booking dates and times
        $dates = [];
        $bookings = [
            ['amenity_id' => 1, 'start_time' => '13:00', 'end_time' => '16:00'],
            ['amenity_id' => 2, 'start_time' => '16:00', 'end_time' => '19:00'],
            ['amenity_id' => 2, 'start_time' => '14:00', 'end_time' => '17:00'],
        ];

        foreach ($bookings as $booking) {
            do {
                $date = Carbon::today()->addDays(rand(5, 10))->toDateString();
            } while (isset($dates[$date]) && in_array($booking['start_time'], $dates[$date]));

            // Store the date and time to avoid conflicts
            $dates[$date][] = $booking['start_time'];

            // Create the booking
            Booking::create([
                'amenity_id' => $booking['amenity_id'],
                'booking_date' => $date,
                'start_time' => $booking['start_time'],
                'end_time' => $booking['end_time'],
                'full_name' => 'Jaspher',
                'email' => 'jasxyke24.jxc@gmail.com',
                'contact_number' => '09487834861',
                'booking_status' => 'reserved',
                'payment_status' => 'paid',
            ]);
        }
    }
}