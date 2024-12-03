<?php

namespace App\Jobs;

use App\Helpers\SettingsHelper;
use App\Models\Bill;
use App\Models\Resident;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MonthlyBills implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }
    
    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Log::info('Monthly Bills Generated');

        $residents = Resident::all();
        $now = Carbon::now();

        Log::info('Resident count: ' . Resident::count());


        // Retrieve the bill amount from settings
        $billAmount = SettingsHelper::get('bill_amount_per_month') ?? 1000;

        // Prepare data for bulk insert
        $bills = $residents->map(function ($resident) use ($now, $billAmount) {
            return [
                'resident_id' => $resident->id,
                'amount' => $billAmount,
                'issue_date' => $now->copy()->firstOfMonth(), // Set issue date as the first day of the month
                'due_date' => $now->copy()->firstOfMonth()->addDays(6), // Set due date as the 7th day of the month
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        // Use a transaction for safety
        DB::transaction(function () use ($bills) {
            Bill::insert($bills);
        });

        return;
    }
}