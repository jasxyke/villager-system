<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAmenityRequest extends FormRequest
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
            'name' => 'required|string|max:100',
            'day_price' => 'nullable|numeric|min:0',
            'night_price' => 'nullable|numeric|min:0',
            'day_per_person_price' => 'nullable|numeric|min:0',
            'night_per_person_price' => 'nullable|numeric|min:0',
            'guest_additional_price' => 'nullable|numeric|min:0',
            'extension_price' => 'nullable|numeric|min:0',
        ];
    }
}