<?php

namespace App\Mail;

use App\Models\CarStickerRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CarStickerFeeNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $stickerRequest;

    /**
     * Create a new message instance.
     */
    public function __construct(CarStickerRequest $stickerRequest)
    {
        $this->stickerRequest = $stickerRequest;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Car Sticker Request Fee Update')
                    ->view('emails.car_sticker_fee_notification');
    }
}