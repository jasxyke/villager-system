<?php

namespace Database\Seeders;

use App\Helpers\SettingsHelper;
use App\Models\PermitDocument;
use App\Models\PermitRequest;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class PermitRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['pending', 'rejected', 'to_pay', 'in_progress', 'to_claim', 'claimed'];
        $dummyDocumentUrl = Storage::disk('public')->url('default_img.jpg');
        $settings = SettingsHelper::all(); // Fetch all settings

        foreach ($statuses as $status) {
            for ($i = 1; $i <= 3; $i++) {
                // Generate random dates for expected start and end dates
                $expectedStartDate = Carbon::now()->addDays(rand(1, 30))->toDateString();
                $expectedEndDate = Carbon::parse($expectedStartDate)->addDays(rand(1, 15))->toDateString();

                // Generate a unique reference number using the model's method
                $referenceNumber = PermitRequest::generateUniqueReference();

                // Fetch clearance and processing fees dynamically from settings
                $buildingClearanceFee = $settings['building_clearance_fee'] ?? 0;
                $constructionClearanceFee = $settings['construction_clearance_fee'] ?? 0;
                $processingFee = $settings['processing_fee'] ?? 0;

                // Randomize the permit type (either 'Building Clearance' or 'Construction Clearance')
                $permitType = rand(0, 1) === 0 ? 'Building Clearance' : 'Construction Clearance';

                // Randomize the type of clearance (e.g., building or construction)
                $clearanceFee = $permitType === 'Building Clearance' ? $buildingClearanceFee : $constructionClearanceFee;

                // Create permit request
                $permitRequest = PermitRequest::create([
                    'resident_id' => 1,
                    'purpose' => 'Purpose for clearance request ' . $i,
                    'permit_status' => $status,
                    'processing_fee' => $processingFee,
                    'permit_fee' => $clearanceFee,
                    'expect_start_date' => $expectedStartDate,
                    'expect_end_date' => $expectedEndDate,
                    'permit_type' => $permitType,  // Assign the randomized permit type
                    'application_date' => Carbon::now()->subDays(rand(1, 30))->toDateString(),
                    'approval_date' => in_array($status, ['to_pay', 'in_progress', 'to_claim', 'claimed']) ? Carbon::now()->subDays(rand(1, 30))->toDateString() : null,
                    'completed_date' => $status === 'to_claim' ? Carbon::now()->subDays(rand(1, 15))->toDateString() : null,
                    'claimed_date' => $status === 'claimed' ? Carbon::now()->subDays(rand(1, 7))->toDateString() : null,
                    'note' => $status === 'rejected' ? 'Reason for rejection' : null,
                    'reference_number' => $referenceNumber, // Use generated reference number
                ]);

                // Create dummy permit document for each request
                PermitDocument::create([
                    'permit_request_id' => $permitRequest->id,
                    'description' => 'Dummy document for permit request ' . $i,
                    'document_path' => 'default_doc.pdf',
                    'document_url' => $dummyDocumentUrl,
                    'upload_date' => Carbon::now()->toDateString(),
                ]);
            }
        }
    }
}