<?php

namespace App\Http\Controllers;

use App\Models\StickerPayment;
use App\Http\Requests\StoreStickerPaymentRequest;
use App\Http\Requests\UpdateStickerPaymentRequest;
use Illuminate\Http\Request;

class StickerPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
