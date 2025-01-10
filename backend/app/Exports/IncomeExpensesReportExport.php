<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class IncomeExpensesReportExport implements FromView
{
    protected $year;
    protected $month;
    protected $headerData;

    public function __construct($year, $month, $headerData)
    {
        $this->year = $year;
        $this->month = $month;
        $this->headerData = $headerData;
    }

    public function view(): View
    {
        // Income Data
        $bookingIncome = DB::table('booking_payments')
            ->whereYear('payment_date', $this->year)
            ->whereMonth('payment_date', $this->month)
            ->sum('amount');

        $billsIncome = DB::table('transactions')
            ->whereYear('transaction_date', $this->year)
            ->whereMonth('transaction_date', $this->month)
            ->sum('amount');

        $permitIncome = DB::table('permit_payments')
            ->whereYear('payment_date', $this->year)
            ->whereMonth('payment_date', $this->month)
            ->sum('amount');

        $stickerIncome = DB::table('sticker_payments')
            ->whereYear('payment_date', $this->year)
            ->whereMonth('payment_date', $this->month)
            ->sum('amount');

        $totalIncome = $bookingIncome + $billsIncome + $permitIncome + $stickerIncome;

        $incomeData = [
            ['category' => 'Amenity Bookings', 'amount' => $bookingIncome],
            ['category' => 'Monthly Dues', 'amount' => $billsIncome],
            ['category' => 'Clearance Requests', 'amount' => $permitIncome],
            ['category' => 'Car Stickers', 'amount' => $stickerIncome],
            ['category' => 'Total Income', 'amount' => $totalIncome],
        ];

        // Expense Data
        $expenses = DB::table('expenses')
            ->whereYear('expenses_date', $this->year)
            ->whereMonth('expenses_date', $this->month)
            ->select('expense_name as category', 'amount')
            ->get();

        $totalExpenses = $expenses->sum('amount');

        // Convert the expenses collection to an array
        $expenseData = $expenses->map(function ($expense) {
            return [
                'category' => $expense->category,
                'amount' => $expense->amount
            ];
        })->toArray();

        // Add 'Total Expenses' as an array
        $expenseData[] = [
            'category' => 'Total Expenses',
            'amount' => $totalExpenses
        ];

        Log::info($expenseData);

        return view('exports.income_expenses_report', [
            'incomeData' => $incomeData,
            'expenseData' => $expenseData,
            'month' => $this->month,
            'year' => $this->year,
            'headerData' => $this->headerData
        ]);
    }
}