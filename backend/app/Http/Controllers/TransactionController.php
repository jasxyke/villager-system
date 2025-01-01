<?php

namespace App\Http\Controllers;

use App\Helpers\PushNotificationHelper;
use App\Models\Transaction;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Bill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class TransactionController extends Controller
{

    public function updateBillAndAddPayment(Request $request)
    {
        $request->validate([
            'bill_id' => 'required|exists:bills,id',
            'amount' => 'nullable|numeric|min:0',
            'transaction_date' => 'nullable|date',
            'payment_amount' => 'nullable|numeric|min:0',
            'new_status' => 'nullable|in:paid,pending,overdue',
            'payment_method' => 'required'
        ]);

        $bill = Bill::
                    //with(['resident.user'])
                    findOrFail($request->input('bill_id'));

        if ($request->filled('new_status')) {
            $bill->status = $request->input('new_status');
        }
        $bill->save();

        // Add a payment if provided
        if ($request->filled('payment_amount') && $request->filled('transaction_date')) {
            $paymentData = [
                'bill_id' => $bill->id,
                'resident_id' => $bill->resident_id,
                'amount' => $request->input('payment_amount'),
                'transaction_date' => $request->input('transaction_date'),
                'payment_method' => $request->input('payment_method')
            ];
            Transaction::create($paymentData);
        }

        return response()->json(['success' => true]);
    }

    public function updateBillAndAddPayments(Request $request)
    {
        $request->validate([
            'bill_ids' => 'required|array',
            'bill_ids.*' => 'exists:bills,id',
            'payment_amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,e-wallet',
        ]);

        // Calculate payment amount per bill
        $totalAmount = $request->input('payment_amount');
        $numBills = count($request->input('bill_ids'));
        $paymentPerBill = $numBills > 0 ? $totalAmount / $numBills : 0;

        foreach ($request->input('bill_ids') as $billId) {
            $bill = Bill::findOrFail($billId);

            // Update bill status to 'paid'
            $bill->status = 'paid';
            $bill->save();

            // Add a payment transaction
            $paymentData = [
                'bill_id' => $bill->id,
                'resident_id' => $bill->resident_id,
                'amount' => $paymentPerBill,
                'transaction_date' => now(),  // Default to current date
                'payment_method' => $request->input('payment_method'),
            ];
            Transaction::create($paymentData);
        }

        return response()->json(['success' => true]);
    }

    public function getRecentPaidTransactions(Request $request)
    {
        $month = $request->input('month');
        $year = $request->input('year');
        $searchQuery = $request->input('search');

        // Create a query for transactions
        $query = Transaction::with(['resident.user', 'bill'])
            ->whereHas('bill', function($q) {
                $q->where('status', 'paid');  // Filter for paid bills
            });

        // Apply the month and year filter
        if ($month) {
            $query->whereMonth('transaction_date', $month);
        }

        if ($year) {
            $query->whereYear('transaction_date', $year);
        }

        // Apply the search query filter (assuming search is performed on resident name)
        if ($searchQuery) {
            $query->whereHas('resident.user', function ($q) use ($searchQuery) {
                $q->where('firstname', 'like', '%' . $searchQuery . '%')
                  ->orWhere('middlename', 'like', '%' . $searchQuery . '%')
                  ->orWhere('lastname', 'like', '%' . $searchQuery . '%');
            });
        }

        // Order by the most recent transaction date
        $transactions = $query->orderBy('transaction_date', 'desc')
            ->paginate(10); // Adjust the pagination limit as necessary

        return response()->json($transactions);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}