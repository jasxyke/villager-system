<?php

namespace App\Http\Requests;

use App\Models\Booking;
use Illuminate\Contracts\Validation\Validator;
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
            'amenity_id' => 'required|integer|exists:amenities,id',
            'booking_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'contact_number' => 'required|string|max:20',
            'booking_status' => 'required|string|in:for_approval,approved,canceled',
        ];
    }

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
            ->where('booking_status','reserved')
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
