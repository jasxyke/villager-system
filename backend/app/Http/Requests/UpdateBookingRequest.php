<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // return [
        //     'booking_date'=>'required|date_format:Y-m-d|after:today',
        //     'start_time'=>'required|date_format:H:i',
        //     'end_time'=>'required|date_format:H:i|after:start_time',
        //     'full_name'=>'required|string|max:255',
        //     'email'=>'required|string|email:rfc,dns|email',
        //     'contact_number'=>'required|string|max:15',
        //     'booking_status'=>'required|string'
        // ];
        return [
            'booking_id' => 'required|exists:bookings,id',
            'amenity_id' => 'required|exists:amenities,id',
            'booking_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:400',
            'contact_number' => 'required|string|max:15',
            'booking_status' => 'required|in:for_approval,reserved,rejected,cancelled',
            'payment_status' => 'required|in:paid,partial,failed,pending',
            'payments' => 'array',
            // 'payments.*.amount' => 'required|numeric|min:0',
            // 'payments.*.date' => 'required|date',
        ];
    }
}
