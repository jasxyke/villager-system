<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreHouseRequest extends FormRequest
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
            'block'=>'required|numeric',
            'lot'=>'required|numeric',
            'houseType'=>'required|string',
            'lastname'=>'required|string|min:2',
            'firstname'=>'required|string|min:2',
            'middlename'=>'nullable|string|min:2',
            'contactNumber'=>'nullable|string',
            'birthdate'=>'required|date|date_format:Y-m-d',
            'sex'=>'required|string',
            'civilStatus'=>'required|string',
            'facebook'=>'nullable|string',
            'occupation'=>'required|string|',
            'email'=>'required|string|email:rfc,dns|email|max:255|unique:users',
        ];
    }
}
