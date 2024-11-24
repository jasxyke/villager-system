<?php

namespace Database\Seeders;

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

        foreach ($statuses as $status) {
            for ($i = 1; $i <= 3; $i++) {
                // Generate random dates for expected start and end dates
                $expectedStartDate = Carbon::now()->addDays(rand(1, 30))->toDateString();
                $expectedEndDate = Carbon::parse($expectedStartDate)->addDays(rand(1, 15))->toDateString();

                // Create permit request
                $permitRequest = PermitRequest::create([
                    'resident_id' => 1,
                    'purpose' => 'Purpose for permit request ' . $i,
                    // 'floor_size' => rand(50, 150),
                    'permit_status' => $status,
                    'processing_fee' => rand(100, 200),
                    'permit_fee' => rand(400, 600),
                    'expect_start_date' => $expectedStartDate,
                    'expect_end_date' => $expectedEndDate,
                    'application_date' => Carbon::now()->subDays(rand(1, 30))->toDateString(),
                    'approval_date' => in_array($status, ['to_pay', 'in_progress', 'to_claim', 'claimed']) ? Carbon::now()->subDays(rand(1, 30))->toDateString() : null,
                    'completed_date' => $status === 'to_claim' ? Carbon::now()->subDays(rand(1, 15))->toDateString() : null,
                    'claimed_date' => $status === 'claimed' ? Carbon::now()->subDays(rand(1, 7))->toDateString() : null,
                    'note' => $status === 'rejected' ? 'Reason for rejection' : null,
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