<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class BookingReserved extends Mailable
{
    use Queueable, SerializesModels;

    public $booking;
    public $paidAmount;

    /**
     * Create a new message instance.
     *
     * @param Booking $booking
     */
    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
        $this->paidAmount = $this->booking->bookingPayments->sum('amount');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.booking_reserved')
                    ->subject('Your Booking has been Officially Reserved')
                    ->with([
                        'booking' => $this->booking,
                        'paidAmount' => $this->paidAmount,
                        'formattedStartTime' => Carbon::parse($this->booking->start_time)->format('H:i'),
                        'formattedEndTime' => Carbon::parse($this->booking->end_time)->format('H:i'),
                    ]);
    }
}
