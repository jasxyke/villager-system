<?php

use App\Jobs\AddInterestToBills;
use App\Jobs\MonthlyBills;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

// Artisan::command('inspire', function () {
//     $this->comment(Inspiring::quote());
// })->purpose('Display an inspiring quote')->hourly();


Schedule::job(new MonthlyBills)->monthlyOn(1, '00:00');
Schedule::job(new AddInterestToBills)->monthlyOn(1, '00:00'); // Runs on the 1st of each month at midnight