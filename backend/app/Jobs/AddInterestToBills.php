<?php

namespace App\Jobs;

use App\Helpers\SettingsHelper;
use App\Models\Bill;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class AddInterestToBills implements ShouldQueue
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
        //if pwede mag miss ng payment wag na mag add ng additional na bayad
        $allowMissedPayments = SettingsHelper::get('allow_miss_payments');
        if($allowMissedPayments) return;


        $interestRate = SettingsHelper::get('additional_per_missed_payment'); // Get interest rate from settings
        $now = Carbon::now();

        DB::transaction(function () use ($interestRate, $now) {
            // Find all bills that are overdue
            $bills = Bill::where('status', 'pending')
                ->where('due_date', '<', $now)
                ->get();

            foreach ($bills as $bill) {
                // Calculate the new amount with interest added
                $interestAmount = $bill->amount + $interestRate;
                $bill->amount += $interestAmount;
                $bill->save();
            }
        });
    }
}