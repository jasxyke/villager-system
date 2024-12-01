<?php

namespace App\Mail;

use App\Models\PermitRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PermitClaimNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $permitRequest;

    /**
     * Create a new message instance.
     */
    public function __construct(PermitRequest $permitRequest)
    {
        $this->permitRequest = $permitRequest;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Your Clearance is Ready to Be Claimed')
                    ->view('emails.permit-claim-notification');
    }
}