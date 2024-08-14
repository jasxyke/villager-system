<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function getBookingsByYearAndMonth(string $year, string $month){
        $bookings = Booking::with('amenities','booking_payments')
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
            'amenity_id'=>$request->only('amenity_id'),
            'booking_date'=>$request->input('booking_date'),
            'start_time'=>$request->safe()->input('start_time'),
            'end_time'=>$request->safe()->input('end_time'),
            'full_name'=>$request->safe()->input('full_name'),
            'email'=>$request->safe()->input('email'),
            'contact_number'=>$request->safe()->input('contact_number'),
            'booking_status'=>'for_approval'
        ]);

        return response()->json(['booking'=>$booking]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $booking = Booking::findOrFail($id);

        return response()->json(['booking'=>$booking]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookingRequest $request, string $id)
    {
        $booking = Booking::findOrFail($id);

        $booking->booking_date = $request->booking_date;
        $booking->start_time = $request->start_time;
        $booking->end_time = $request->end_time;
        $booking->full_name = $request->full_name;
        $booking->email = $request->email;
        $booking->contact_number = $request->contact_number;
        $booking->booking_status = $request->booking_status;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $booking = Booking::findOrFail($id);

        $booking->delete();
    }
}
