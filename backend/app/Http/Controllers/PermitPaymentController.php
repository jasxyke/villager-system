<?php

namespace App\Http\Controllers;

use App\Models\PermitPayment;
use App\Http\Requests\StorePermitPaymentRequest;
use App\Http\Requests\UpdatePermitPaymentRequest;
use App\Models\PermitRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PermitPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function addPayment(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'permit_request_id' => 'required|exists:permit_requests,id',
            'resident_id' => 'required|exists:residents,id',
            'amount' => 'required|numeric|min:0',
        ]);

        // Find the permit request
        $permitRequest = PermitRequest::findOrFail($validatedData['permit_request_id']);

        // Add payment to permit_payments table
        $payment = new PermitPayment();
        $payment->permit_request_id = $validatedData['permit_request_id'];
        $payment->resident_id = $validatedData['resident_id'];
        $payment->amount = $validatedData['amount'];
        $payment->payment_date = Carbon::now();
        $payment->payment_status = 'completed'; // Mark payment as completed
        $payment->transaction_id = $request->transaction_id ?? null; // Optional transaction ID
        $payment->save();

        // Update the permit request's status
        $permitRequest->permit_status = 'in_progress';
        $permitRequest->completed_date = Carbon::now(); // Set completion date
        $permitRequest->save();

        // Return a success response
        return response()->json([
            'message' => 'Payment added and permit request status updated.',
            'payment' => $payment,
            'permit_request' => $permitRequest
        ], 201);
    }

    public function getPaymentHistory($residentId)
    {
        try {
            // Fetch payments for the given resident ID
            $payments = PermitPayment::where('resident_id', $residentId)
                ->orderBy('payment_date', 'desc') // Order by latest payment first
                ->get();
    
            if ($payments->isEmpty()) {
                // If no payments are found, return a specific message
                return response()->json([
                    'message' => 'No payment history found for the specified resident.',
                    'payments' => [], // Return an empty array for payments
                ], 200);
            }
    
            // Return a JSON response with the payment history
            return response()->json([
                'message' => 'Payment history fetched successfully.',
                'payments' => $payments,
            ], 200);
        } catch (\Exception $e) {
            // Handle any exceptions that may occur
            return response()->json([
                'message' => 'An error occurred while fetching payment history.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermitPaymentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PermitPayment $permitPayment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PermitPayment $permitPayment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermitPaymentRequest $request, PermitPayment $permitPayment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PermitPayment $permitPayment)
    {
        //
    }
}