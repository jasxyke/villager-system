<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf;

class MonthlyDuesReceiptMail extends Mailable
{
    use Queueable, SerializesModels;

    public $resident;
    public $bill;
    public $transactions;
    public $pdf;
    public $totalAmount;

    public function __construct($resident, $bill, $transactions, $pdf, $totalAmount)
    {
        $this->resident = $resident;
        $this->bill = $bill;
        $this->transactions = $transactions;
        $this->pdf = $pdf;
        $this->totalAmount = $totalAmount;
    }

    public function build()
    {
        return $this->subject('Monthly Dues Payment Receipt')
                    ->markdown('notices.monthly_dues_payment_receipt')
                    ->attachData($this->pdf->output(), 'MonthlyDuesReceipt.pdf', [
                        'mime' => 'application/pdf',
                    ]);
    }
}