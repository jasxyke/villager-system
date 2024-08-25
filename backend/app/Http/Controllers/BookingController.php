<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Mail\BookingReserved;
use App\Models\BookingPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $amenity_id = $request->route('amenity_id');
        // $bookings = Booking::with('amenity')
        //                 ->where('amenity_id', $amenity_id)
        //                 ->orderBy('create_at', 'DESC')
        //                 ->paginate(10);
    
        // return response()->json($bookings);
    }

    public function getBookingsByYearAndMonth(Request $request){
        $bookings = Booking::with('amenity')//'booking_payment'
                        ->where('booking_status','reserved')
                        ->where('amenity_id', $request->amenityId)
                        ->whereYear('booking_date',$request->year)
                        ->whereMonth('booking_date',$request->month)
                        ->get();
        return $bookings;
    }

    public function getBookingsAdmin(string $amenityId){

        $bookings = Booking::with(['amenity','bookingPayments'])
                        ->where('amenity_id', $amenityId)
                        ->orderBy('created_at', 'DESC')
                        ->paginate(10);
    
        return response()->json($bookings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingRequest $request)
    {

        $validated = $request->validated();

        // Create the booking
        $booking = Booking::create([
            'amenity_id' => $validated['amenity_id'],
            'booking_date' => $validated['booking_date'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'full_name' => $validated['full_name'],
            'email' => $validated['email'],
            'contact_number' => $validated['contact_number'],
            'booking_status' => $validated['booking_status'],
        ]);

        // Process additional logic if needed, such as saving payments

        return response()->json([
            'message' => 'Booking created successfully!',
            'booking' => $booking
        ], 201);


        // return response()->json(['booking'=>$booking]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $booking = Booking::findOrFail($id);

        return response()->json(['booking'=>$booking]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingRequest $request)
    {
        // $booking = Booking::findOr($id, function (){
        //     throw ValidationException::withMessages([
        //         'message'=>'Booking record not fonud.'
        //     ]);
        // });

        // $booking->booking_date = $request->booking_date;
        // $booking->start_time = $request->start_time;
        // $booking->end_time = $request->end_time;
        // $booking->full_name = $request->full_name;
        // $booking->email = $request->email;
        // $booking->contact_number = $request->contact_number;
        // $booking->booking_status = $request->booking_status;

        // $booking->save();

        // return response()->json(['booking'=>$booking]);
        $validated = $request->validated();

        // Find and update the booking
        $booking = Booking::findOrFail($validated['booking_id']);

        $booking->amenity_id = $request->amenity_id;
        $booking->booking_date = $request->booking_date;
        $booking->start_time = $request->start_time;
        $booking->end_time = $request->end_time;
        $booking->full_name = $request->full_name;
        $booking->email = $request->email;
        $booking->contact_number = $request->contact_number;
        $booking->booking_status = $request->booking_status;
        $booking->payment_status = $request->payment_status;
        $booking->save();

        $booking->bookingPayments()->delete();

        // Handle payments
        if (isset($validated['payments']) && is_array($validated['payments'])) {
            foreach ($validated['payments'] as $paymentData) {
                BookingPayment::create([
                    'booking_id' => $booking->id,
                    'amount' => $paymentData['amount'],
                    'payment_date' => $paymentData['payment_date'],
                ]);
            }
        }

        if ($booking->booking_status == 'reserved') {
            Mail::to($booking->email)->send(new BookingReserved($booking));
        }

        $booking = $booking->load(['bookingPayments','amenity']);

        return response()->json(['success' => 'Sucessfuly updated the booking', 'booking' => $booking], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $booking = Booking::findOr($id, function (){
            throw ValidationException::withMessages([
                'message' => 'Booking record is not found or already deleted'
            ]);
        });

        $booking->delete();

        return response()->json(['message'=>'Booking sucesfully deleted']);
    }
}
