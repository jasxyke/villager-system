<?php

namespace App\Http\Controllers;

use App\Models\StickerPayment;
use App\Http\Requests\StoreStickerPaymentRequest;
use App\Http\Requests\UpdateStickerPaymentRequest;
use App\Models\CarStickerRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StickerPaymentController extends Controller
{
      /**
     * Add a payment for a car sticker request and update its status.
     */
    public function addPayment(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'sticker_request_id' => 'required|exists:car_sticker_requests,id',
            'resident_id' => 'required|exists:residents,id',
            'amount' => 'required|numeric|min:0',
        ]);

        // Find the car sticker request
        $stickerRequest = CarStickerRequest::findOrFail($validatedData['sticker_request_id']);

        // Add payment to sticker_payments table
        $payment = new StickerPayment();
        $payment->car_sticker_request_id = $validatedData['sticker_request_id'];
        $payment->resident_id = $validatedData['resident_id'];
        $payment->amount = $validatedData['amount'];
        $payment->payment_date = Carbon::now();
        $payment->payment_status = 'completed'; // Mark payment as completed
        $payment->transaction_id = $request->transaction_id ?? null; // Optional transaction ID
        $payment->save();

        // Update the car sticker request's status
        $stickerRequest->request_status = 'in_progress';
        $stickerRequest->completed_date = Carbon::now(); // Set completion date
        $stickerRequest->save();

        // Return a success response
        return response()->json([
            'message' => 'Payment added and car sticker request status updated.',
            'payment' => $payment,
            'sticker_request' => $stickerRequest
        ], 201);
    }

    public function getPaymentHistory(Request $request)
    {
        $residentId = $request->user()->resident->id;

        // Validate the resident_id parameter
        if (!$residentId) {
            return response()->json(['message' => 'Resident ID is required'], 400);
        }

        // Fetch payments for the resident
        $payments = StickerPayment::where('resident_id', $residentId)
            ->with('carStickerRequest') // Eager load related car sticker requests
            ->get();

        return response()->json($payments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStickerPaymentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(StickerPayment $stickerPayment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StickerPayment $stickerPayment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStickerPaymentRequest $request, StickerPayment $stickerPayment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StickerPayment $stickerPayment)
    {
        //
    }
}