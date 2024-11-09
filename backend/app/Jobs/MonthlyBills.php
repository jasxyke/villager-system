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
        $residents = Resident::all();
        $now = Carbon::now();

        DB::transaction(function () use ($residents, $now) {
            foreach ($residents as $resident) {
                Bill::create([
                    'resident_id' => $resident->id,
                    'amount' => SettingsHelper::get('bill_amount_per_month'),
                    'due_date' => $now->copy()->firstOfMonth(),
                    'status' => 'pending',
                    'issue_date' => $now->copy()->lastOfMonth(),
                ]);
            }
        });
    }
    // Generate bills for all residents every month
    public function generateMonthlyBills()
    {
        
        $residents = Resident::all();
        $now = Carbon::now();

        DB::transaction(function () use ($residents, $now) {
            foreach ($residents as $resident) {
                Bill::create([
                    'resident_id' => $resident->id,
                    'amount' => 1000, // Replace with your logic to calculate the amount
                    'due_date' => $now->copy()->nextWeekday(),
                    'status' => 'pending',
                    'issue_date' => $now->copy()->nextWeekday(),
                ]);
            }
        });
    }
}