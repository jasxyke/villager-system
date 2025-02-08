<?php

namespace App\Http\Controllers;

use App\Helpers\HeaderHelper;
use App\Helpers\PushNotificationHelper;
use App\Models\Transaction;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\Bill;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;
use App\Mail\MonthlyDuesReceiptMail;
class TransactionController extends Controller
{

    public function updateBillAndAddPayment(Request $request)
    {
        $request->validate([
            'bill_id' => 'required|exists:bills,id',
            'payment_amount' => 'nullable|numeric|min:0',
            'transaction_date' => 'nullable|date',
            'new_status' => 'nullable|in:paid,pending,overdue',
            'payment_method' => 'required'
        ]);
    
        $bill = Bill::findOrFail($request->input('bill_id'));

        $bills = [];
        $totalAmount = $bill->amount;
        array_push($bills, $bill);
    
        if ($request->filled('new_status')) {
            $bill->status = $request->input('new_status');
        }
        $bill->save();
    
        // Add a payment if provided
        if ($request->filled('payment_amount') && $request->filled('transaction_date')) {
            $paymentData = [
                'bill_id' => $bill->id,
                'reference_number' => Transaction::generateUniqueReference(),
                'resident_id' => $bill->resident_id,
                'amount' => $request->input('payment_amount'),
                'transaction_date' => $request->input('transaction_date'),
                'payment_method' => $request->input('payment_method')
            ];
            Transaction::create($paymentData);
    
            // Fetch all transactions related to this bill
            $transactions = Transaction::where('bill_id', $bill->id)->get();
    
            $headerData = HeaderHelper::getHeaderData();

            // Generate PDF receipt
            $pdf = Pdf::loadView('invoices.monthly_dues_receipt', [
                'resident' => $bill->resident,
                'bill' => $bill,
                'transactions' => $transactions,
                'headerData' => $headerData,
                'user' => $bill->resident->user,
                'house' => $bill->resident->house,
                'totalAmount' => $totalAmount,
                'bills' => $bills
            ]);
    
            // Send the receipt via email
            Mail::to($bill->resident->user->email)->send(new MonthlyDuesReceiptMail($bill->resident, $bill, $transactions, $pdf, $totalAmount));
    
            // Send push notification
            $title = "Monthly Due Payment Received!";
            $message = "Your payment for the bill for " . Carbon::parse($bill->due_date)->format('F Y') . " has been received.";
            PushNotificationHelper::sendToUser($bill->resident->user->id, $title, $message);
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

        $totalAmount = $request->input('payment_amount');
        $numBills = count($request->input('bill_ids'));
        $paymentPerBill = $numBills > 0 ? $totalAmount / $numBills : 0;
        $resident = null;
        $transactions = [];
        $bills = [];

        foreach ($request->input('bill_ids') as $billId) {
            $bill = Bill::findOrFail($billId);
            $resident = $bill->resident;

            // Update bill status
            $bill->status = 'paid';
            $bill->save();

            // Add payment
            $paymentData = [
                'bill_id' => $bill->id,
                'reference_number' => Transaction::generateUniqueReference(),
                'resident_id' => $bill->resident_id,
                'amount' => $paymentPerBill,
                'transaction_date' => now(),
                'payment_method' => $request->input('payment_method'),
            ];
            $transactions[] = Transaction::create($paymentData);

            array_push($bills, $bill);
        }

        $headerData = HeaderHelper::getHeaderData();

        // Generate PDF receipt
        $pdf = Pdf::loadView('invoices.monthly_dues_receipt', [
            'resident' => $resident,
            'bill' => end($transactions)->bill,
            'transactions' => $transactions,
            'headerData' => $headerData,
            'user' => $bill->resident->user,
            'house' => $bill->resident->house,
            'totalAmount' => $totalAmount,
            'bills' => $bills
        ]);

        // Send receipt via email
        Mail::to($resident->user->email)->send(new MonthlyDuesReceiptMail($resident->user, end($transactions)->bill, $transactions, $pdf, $totalAmount));
        // Send push notification
        $title = "Monthly Due Payments Received!";
        $message = "Your payments for multiple months have been received, please check your payment history for more details.";
        PushNotificationHelper::sendToUser($bill->resident->user->id, $title, $message);

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