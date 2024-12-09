<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCarStickerRequestRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Update this if you have authorization logic
    }

    public function rules()
    {
        return [
            'car_model' => 'required|string|max:255',
            'car_plate_number' => 'required|string|max:255',
            'images' => 'required|array',
            'images.*.description' => 'string|max:200',
        ];
    }
}