<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCarStickerRequestRequest extends FormRequest
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
     */
    public function rules()
    {
        return [
            'car_model' => 'required|string|max:255',
            'car_plate_number' => 'required|string|max:255',
            'images.*.uri' => 'required|url',
            'images.*.description' => 'nullable|string|max:200',
        ];
    }

    /**
     * Custom messages for validation errors.
     */
    public function messages()
    {
        return [
            'car_model.required' => 'Car model is required.',
            'car_plate_number.required' => 'Plate number is required.',
            'images.*.uri.required' => 'Image URI is required.',
            'images.*.uri.url' => 'Image URI must be a valid URL.',
            'images.*.description.max' => 'Image description cannot be longer than 200 characters.',
        ];
    }
}
