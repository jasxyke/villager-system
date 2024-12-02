<?php

namespace App\Http\Controllers;

use App\Helpers\HeaderHelper;
use App\Helpers\SettingsHelper;
use App\Models\StickerPayment;
use App\Http\Requests\StoreStickerPaymentRequest;
use App\Http\Requests\UpdateStickerPaymentRequest;
use App\Mail\CarStickerPaymentReceipt;
use App\Models\CarStickerRequest;
use Carbon\Carbon;
use Dompdf\Dompdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class StickerPaymentController extends Controller
{
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

        // Generate the receipt PDF
        $receiptPdf = $this->generateReceiptPdf($payment->id);

        // Send the receipt via email
        $resident = $payment->resident->user;
        Mail::to($resident->email)->send(new CarStickerPaymentReceipt($resident, $payment, $receiptPdf));

        // Return a success response
        return response()->json([
            'message' => 'Payment added, car sticker request status updated, and email sent with receipt.',
            'payment' => $payment,
            'sticker_request' => $stickerRequest
        ], 201);
    }

    public function generateReceiptPdf($paymentId)
    {
        // Fetch the payment, car sticker request, and resident data
        $payment = StickerPayment::findOrFail($paymentId);
        $carStickerRequest = $payment->carStickerRequest;
        $resident = $payment->resident->user;

        // Subdivision name
        $headerData = HeaderHelper::getHeaderData();

        // Format data for the receipt
        $formattedAmount = number_format((float) $payment->amount, 2);
        $formattedPaymentDate = Carbon::parse($payment->payment_date)->format('F d, Y');

        // Generate the receipt as a PDF
        $dompdf = new Dompdf();
        $dompdf->loadHtml(view('invoices.car_stickers_receipt', compact('payment', 'carStickerRequest', 'resident', 'headerData', 'formattedAmount', 'formattedPaymentDate'))->render());
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        // Return the PDF output
        return $dompdf->output(); // For emailing
    }

    public function downloadReceipt($paymentId)
    {
        // Fetch the payment, car sticker request, and resident data
        $payment = StickerPayment::findOrFail($paymentId);
        $carStickerRequest = $payment->carStickerRequest;
        $resident = $payment->resident;

        // Subdivision name
        $headerData = HeaderHelper::getHeaderData();

        //format payment amount string to float
        $payment->amount = (float) $payment->amount;

        // Generate the receipt as a PDF
        $dompdf = new Dompdf();
        $dompdf->loadHtml(view('invoices.car_stickers_receipt', compact('payment', 'carStickerRequest', 'resident', 'headerData'))->render());
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        // Stream the PDF to the browser
        return $dompdf->stream('car_sticker_payment_receipt.pdf');
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