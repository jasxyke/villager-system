<?php
use App\Jobs\MonthlyBills;
use App\Jobs\AddInterestToBills;
use App\Jobs\Testing;
use Illuminate\Support\Facades\Schedule;

// Schedule the MonthlyBills job to run on the 1st of each month at midnight
// Schedule::job(new MonthlyBills)->monthlyOn('1','0:0');
Schedule::job(new MonthlyBills)->everyTwentySeconds();

// Schedule the AddInterestToBills job to run on the 1st of each month at midnight
Schedule::job(new AddInterestToBills)->monthlyOn('1','0:0');