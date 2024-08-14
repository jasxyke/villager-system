<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
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
        return [
            'booking_date'=>'required|date_format:Y-m-d|after:today',
            'start_time'=>'required|date_format:H:i',
            'end_time'=>'required|date_format:H:i|after:start_time',
            'full_name'=>'required|string|max:255',
            'email'=>'required|string|email',//email:rfc,dns  ADD THIS KAPAG SURE NG ONLINE
            'contact_number'=>'required|string|max:15',
        ];
    }
}
