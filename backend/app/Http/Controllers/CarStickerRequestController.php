<?php

namespace App\Http\Controllers;

use App\Models\CarStickerRequest;
use App\Http\Requests\StoreCarStickerRequestRequest;
use App\Http\Requests\UpdateCarStickerRequestRequest;
use App\Models\StickerDocument;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CarStickerRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created car sticker request in storage.
     */
    public function store(StoreCarStickerRequestRequest $request)
    {
        // Validate the incoming request
        $validated = $request->validated();

        $user = $request->user();

        // Create the car sticker request
        $carStickerRequest = CarStickerRequest::create([
            'resident_id' => $user->resident->id, // assuming the user is logged in and has a resident_id
            'car_model' => $validated['car_model'],
            'car_plate_number' => $validated['car_plate_number'],
            'request_status' => 'pending', // or any default status you prefer
            'application_date' => now()->toDateString(), // setting the application date to now
        ]);

        // Handle image uploads
        if (isset($validated['images'])) {
            foreach ($validated['images'] as $image) {
                // Assuming the image is an array with URI and description
                $imageUri = $image['uri'];
                $description = $image['description'];

                // Save image to storage and get its path
                $path = Storage::disk('public')->put('images', file_get_contents($imageUri));

                // Create sticker document record
                StickerDocument::create([
                    'car_sticker_request_id' => $carStickerRequest->id,
                    'description' => $description,
                    'document_path' => $path, // Store the path to the file
                    'document_url' => Storage::disk('public')->url($path), // Generate the URL to the file
                    'upload_date' => now()->toDateString(), // setting the upload date to now
                ]);
            }
        }

        return response()->json(['message' => 'Car sticker request submitted successfully!'], 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(CarStickerRequest $carStickerRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCarStickerRequestRequest $request, CarStickerRequest $carStickerRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarStickerRequest $carStickerRequest)
    {
        //
    }
}
