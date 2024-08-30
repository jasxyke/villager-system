<?php

namespace App\Http\Controllers;

use App\Models\PermitPayment;
use App\Http\Requests\StorePermitPaymentRequest;
use App\Http\Requests\UpdatePermitPaymentRequest;

class PermitPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
