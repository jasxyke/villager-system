<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePermitRequestRequest extends FormRequest
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
            'purpose' => 'required|string|max:255',
            'floorSize' => 'nullable|numeric',
            'documents' => 'required',
            'documents.*' => 'required|file|mimes:jpeg,png,pdf|max:2048', // Adjust file type and size as needed
            'descriptions.*' => 'nullable|string|max:255',
        ];
    }
}
