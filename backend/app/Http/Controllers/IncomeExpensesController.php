<?php

namespace App\Http\Controllers;

use App\Exports\IncomeExpensesReportExport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class IncomeExpensesController extends Controller
{
    public function exportIncomeExpenses(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|integer',
            'month' => 'required|integer|min:1|max:12',
        ]);

        $year = $validated['year'];
        $month = $validated['month'];

        return Excel::download(new IncomeExpensesReportExport($year, $month), 
                    "Income_Expenses_Report_{$year}_{$month}.xlsx");
    }


    public function getTotalIncome(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|integer',
            'month' => 'required|integer|min:1|max:12',
        ]);

        $year = $validated['year'];
        $month = $validated['month'];

        // Bookings income
        $bookingIncome = DB::table('booking_payments')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->sum('amount');

        // Bills income
        $billsIncome = DB::table('transactions')
            ->whereYear('transaction_date', $year)
            ->whereMonth('transaction_date', $month)
            ->sum('amount');

        // Permit payments
        $permitIncome = DB::table('permit_payments')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->sum('amount');

        // Car sticker payments
        $stickerIncome = DB::table('sticker_payments')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->sum('amount');

        // Compile the results
        $incomeData = [
            'bookings' => $bookingIncome,
            'bills' => $billsIncome,
            'permits' => $permitIncome,
            'car_stickers' => $stickerIncome,
            'total_income' => $bookingIncome + $billsIncome + $permitIncome + $stickerIncome,
        ];

        return response()->json([
            'success' => true,
            'data' => $incomeData,
        ]);
    }
}