<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAmenityRequest extends FormRequest
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
            'day_price' => 'required|numeric|min:0',
            'night_price' => 'required|numeric|min:0',
            'guest_additional_price' => 'required|numeric|min:0',
            'extension_price' => 'required|numeric|min:0',
        ];
    }
}
