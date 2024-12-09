<?php

namespace Database\Seeders;

use App\Helpers\SettingsHelper;
use App\Models\CarStickerRequest;
use App\Models\StickerDocument;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;

class CarStickerRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['pending', 'approved', 'rejected', 'in_progress', 'completed', 'claimed'];
        $stickerTypes = ['two_wheel', 'four_wheel', 'delivery_truck', 'pass_through']; // Sticker types array
        $dummyImageUrl = 'https://via.placeholder.com/150'; // Dummy image URL
        $settings = SettingsHelper::all(); // Fetch all settings

        foreach ($statuses as $status) {
            for ($i = 1; $i <= 3; $i++) {
                // Generate reference number
                $referenceNumber = CarStickerRequest::generateUniqueReference();

                // Get sticker fee based on type
                $stickerType = Arr::random($stickerTypes);
                $stickerFeeKey = "payment_per_car_sticker_{$stickerType}";
                $stickerFee = $settings[$stickerFeeKey] ?? 0;

                // Create car sticker request
                $stickerRequest = CarStickerRequest::create([
                    'resident_id' => 1,
                    'reference_number' => $referenceNumber,
                    'car_model' => 'Car Model ' . $i,
                    'car_plate_number' => 'ABC' . rand(1000, 9999),
                    'request_status' => $status,
                    'application_date' => Carbon::now()->subDays(rand(1, 30))->toDateString(),
                    'approval_date' => in_array($status, ['approved', 'to_pay', 'in_progress', 'completed']) ? Carbon::now()->subDays(rand(1, 30))->toDateString() : null,
                    'completed_date' => $status === 'completed' ? Carbon::now()->subDays(rand(1, 30))->toDateString() : null,
                    'claimed_date' => $status === 'claimed' ? Carbon::now()->subDays(rand(1, 30))->toDateString() : null,
                    'sticker_fee' => $stickerFee,
                    'note' => $status === 'rejected' ? 'Reason for rejection' : null,
                    'sticker_type' => $stickerType,
                ]);

                // Create dummy sticker document for each request
                StickerDocument::create([
                    'car_sticker_request_id' => $stickerRequest->id,
                    'description' => 'Dummy document for car sticker request ' . $i,
                    'document_path' => 'default_img.jpg',
                    'document_url' => Storage::disk('public')->url('default_img.jpg'),
                    'upload_date' => Carbon::now()->toDateString(),
                ]);
            }
        }
    }
}