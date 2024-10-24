<?php

namespace App\Mail;

use App\Models\CarStickerRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CarStickerRejectedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $carStickerRequest;

    /**
     * Create a new message instance.
     *
     * @param  \App\Models\CarStickerRequest  $carStickerRequest
     * @return void
     */
    public function __construct(CarStickerRequest $carStickerRequest)
    {
        $this->carStickerRequest = $carStickerRequest;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Car Sticker Request Rejected')
                    ->view('emails.car_sticker_rejected');
    }
}