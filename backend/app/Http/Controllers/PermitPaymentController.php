<?php

namespace App\Http\Controllers;

use App\Helpers\HeaderHelper;
use App\Models\PermitPayment;
use App\Http\Requests\StorePermitPaymentRequest;
use App\Http\Requests\UpdatePermitPaymentRequest;
use App\Mail\PermitPaymentReceipt;
use App\Models\PermitRequest;
use Carbon\Carbon;
use Dompdf\Dompdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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

        // Generate the receipt PDF
        $receiptPdf = $this->generateReceiptPdf($payment->id);

        // Send the receipt via email
        $resident = $payment->resident->user;
        Mail::to($resident->email)->send(new PermitPaymentReceipt($resident, $payment, $receiptPdf));

        // Return a success response
        return response()->json([
            'message' => 'Payment added, permit request status updated, and email sent with receipt.',
            'payment' => $payment,
            'permit_request' => $permitRequest,
        ], 201);
    }

    public function generateReceiptPdf($paymentId)
    {
        // Fetch the payment, permit request, and resident data
        $payment = PermitPayment::findOrFail($paymentId);
        $permitRequest = $payment->permitRequest;
        $resident = $payment->resident->user;

        // Subdivision name
        $headerData = HeaderHelper::getHeaderData();

        // Format data for the receipt
        $formattedAmount = number_format((float)$payment->amount, 2);
        $formattedPaymentDate = Carbon::parse($payment->payment_date)->format('F d, Y');

        // Generate the receipt as a PDF
        $dompdf = new Dompdf();
        $dompdf->loadHtml(view('invoices.clearance_receipt', compact('payment', 'permitRequest', 'resident', 'headerData', 'formattedAmount', 'formattedPaymentDate'))->render());
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        // Return the PDF output
        return $dompdf->output(); // For emailing
    }

    public function downloadReceipt($paymentId)
    {
        // Fetch the payment, permit request, and resident data
        $payment = PermitPayment::findOrFail($paymentId);
        $permitRequest = $payment->permitRequest;
        $resident = $payment->resident;

        // Subdivision name
        $headerData = HeaderHelper::getHeaderData();

        // Generate the receipt as a PDF
        $dompdf = new Dompdf();
        $dompdf->loadHtml(view('invoices.clearance_receipt', compact('payment', 'permitRequest', 'resident', 'headerData'))->render());
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        // Return the generated PDF for download
        return response($dompdf->output(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="permit_payment_receipt.pdf"',
        ]);
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