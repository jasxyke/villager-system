<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CarStickerPaymentReceipt extends Mailable
{
    use Queueable, SerializesModels;

    public $resident;
    public $payment;
    public $receiptPdf;

    /**
     * Create a new message instance.
     */
    public function __construct($resident, $payment, $receiptPdf)
    {
        $this->resident = $resident;
        $this->payment = $payment;
        $this->receiptPdf = $receiptPdf;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Car Sticker Payment Receipt')
                    ->view('notices.sticker_payment_receipt')
                    ->attachData($this->receiptPdf, 'receipt.pdf', [
                        'mime' => 'application/pdf',
                    ]);
    }
}