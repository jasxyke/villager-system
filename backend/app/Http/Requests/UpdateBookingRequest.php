<?php

namespace App\Http\Requests;

use App\Models\Booking;
use Illuminate\Contracts\Validation\Validator;
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
        return [
            'booking_id' => 'required|exists:bookings,id',
            'resident_id' => 'required|integer|exists:residents,id',
            'amenity_id' => 'required|exists:amenities,id',
            'booking_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'num_of_resident' => 'nullable|integer',
            'num_of_guest' => 'nullable|integer',
            'notify' => 'required|boolean',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:400',
            'contact_number' => 'required|string|max:15',
            'booking_status' => 'required|in:for_approval,reserved,rejected,cancelled',
            'payment_status' => 'required|in:paid,partial,failed,pending',
            'payments' => 'array',
        ];
    }

    /**
     * Apply custom validation logic.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function ($validator) {
            $this->checkForConflicts($validator);
        });
    }

    /**
     * Check for booking conflicts.
     */
    protected function checkForConflicts(Validator $validator): void
    {
        $conflictExists = Booking::where('amenity_id', $this->amenity_id)
            ->where('booking_date', $this->booking_date)
            ->where('id', '!=', $this->booking_id) // Exclude current booking ID
            ->where('booking_status', 'reserved')
            ->where(function ($query) {
                $query->whereBetween('start_time', [$this->start_time, $this->end_time])
                      ->orWhereBetween('end_time', [$this->start_time, $this->end_time])
                      ->orWhere(function ($query) {
                          $query->where('start_time', '<=', $this->start_time)
                                ->where('end_time', '>=', $this->end_time);
                      });
            })
            ->exists();

        if ($conflictExists) {
            $validator->errors()->add('time_slot', 'The selected time slot is already booked.');
        }
    }
}