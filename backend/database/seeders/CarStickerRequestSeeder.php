<?php

namespace Database\Seeders;

use App\Models\CarStickerRequest;
use App\Models\StickerDocument;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr; // Import the Arr class

class CarStickerRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['pending', 'approved', 'rejected', 'in_progress', 'completed', 'claimed'];
        $stickerTypes = ['two_wheel', 'four_wheel', 'delivery_truck']; // Sticker types array
        $dummyImageUrl = 'https://via.placeholder.com/150'; // Dummy image URL

        foreach ($statuses as $status) {
            for ($i = 1; $i <= 3; $i++) {
                // Create car sticker request
                $stickerRequest = CarStickerRequest::create([
                    'resident_id' => 1,
                    'car_model' => 'Car Model ' . $i,
                    'car_plate_number' => 'ABC' . rand(1000, 9999),
                    'request_status' => $status,
                    'application_date' => Carbon::now()->subDays(rand(1, 30))->toDateString(),
                    'approval_date' => in_array($status, ['approved', 'in_progress', 'claimed']) ? Carbon::now()->subDays(rand(1, 30))->toDateString() : null,
                    'completed_date' => $status === 'completed' ? Carbon::now()->subDays(rand(1, 30))->toDateString() : null,
                    'claimed_date' => $status === 'claimed' ? Carbon::now()->subDays(rand(1, 30))->toDateString() : null,
                    'sticker_fee' => rand(400, 600),
                    'processing_fee' => rand(100, 200),
                    'note' => $status === 'rejected' ? 'Reason for rejection' : null,
                    'sticker_type' => Arr::random($stickerTypes), // Randomize sticker type
                ]);

                // Create dummy sticker document for each request
                StickerDocument::create([
                    'car_sticker_request_id' => $stickerRequest->id,
                    'description' => 'Dummy document for car sticker request ' . $i,
                    'document_path' =>'default_img.jpg',
                    'document_url' => Storage::disk('public')->url('default_img.jpg'),
                    'upload_date' => Carbon::now()->toDateString(),
                ]);
            }
        }
    }
}