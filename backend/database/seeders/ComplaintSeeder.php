<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Complaint;

class ComplaintSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample complaint data
        Complaint::create([
            'resident_id' => 1, // Assuming a resident with ID 1 exists
            'status' => 'Pending',
            'type' => 'Noise',
            'date_sent' => now(),
            'message' => 'Loud music late at night.'
        ]);

        Complaint::create([
            'resident_id' => 2, // Assuming a resident with ID 2 exists
            'status' => 'Pending',
            'type' => 'Dispute',
            'date_sent' => now(),
            'message' => 'Neighbor dispute over parking space.'
        ]);

        Complaint::create([
            'resident_id' => 3, // Assuming a resident with ID 3 exists
            'status' => 'Solved',
            'type' => 'Noise',
            'date_sent' => now()->subDays(5), // 5 days ago
            'message' => 'Dog barking early in the morning.'
        ]);
    }
}
