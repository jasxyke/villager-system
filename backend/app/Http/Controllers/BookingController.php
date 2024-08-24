<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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

    public function getBookingsAdmin(string $year, string $month){
        $bookings = Booking::with('amenity','booking_payment')
                    ->whereYear('booking_date',$year)
                    ->whereMonth('booking_date',$month)
                    ->get();
        return $bookings;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingRequest $request)
    {

        // $booking = $request->all();

        $booking = Booking::create([
            'amenity_id'=>$request->input('amenity_id'),
            'booking_date'=>$request->input('booking_date'),
            'start_time'=>$request->safe()->input('start_time'),
            'end_time'=>$request->safe()->input('end_time'),
            'full_name'=>$request->safe()->input('full_name'),
            'email'=>$request->safe()->input('email'),
            'contact_number'=>$request->safe()->input('contact_number'),
            'booking_status'=>'for_approval'
        ]);

        $booking->load('amenity');

        return response()->json(['booking'=>$booking]);
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
    public function update(UpdateBookingRequest $request, string $id)
    {
        $booking = Booking::findOr($id, function (){
            throw ValidationException::withMessages([
                'message'=>'Booking record not fonud.'
            ]);
        });

        $booking->booking_date = $request->booking_date;
        $booking->start_time = $request->start_time;
        $booking->end_time = $request->end_time;
        $booking->full_name = $request->full_name;
        $booking->email = $request->email;
        $booking->contact_number = $request->contact_number;
        $booking->booking_status = $request->booking_status;

        $booking->save();

        return response()->json(['booking'=>$booking]);
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
