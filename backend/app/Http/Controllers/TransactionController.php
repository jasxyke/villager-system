<?php

namespace App\Http\Controllers;

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
        'new_amount' => 'nullable|numeric|min:0',
        'new_status' => 'nullable|in:paid,unpaid,overdue',
    ]);

    $bill = Bill::findOrFail($request->input('bill_id'));

    // Update the bill details
    if ($request->filled('new_amount')) {
        $bill->amount = $request->input('new_amount');
    }
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
        ];
        Transaction::create($paymentData);
    }

    return response()->json(['success' => true]);
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
