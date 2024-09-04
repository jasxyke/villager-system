<?php

namespace App\Http\Controllers;

use App\Models\CarStickerRequest;
use App\Http\Requests\StoreCarStickerRequestRequest;
use App\Http\Requests\UpdateCarStickerRequestRequest;
use App\Models\StickerDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
class CarStickerRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function getPendingRequests(Request $request)
    {
        $user = $request->user();

        // Validate resident ID
        if (!$user->resident->id) {
            return response()->json(['message' => 'Resident ID is required'], 400);
        }

        // Fetch pending car sticker requests
        $requests = CarStickerRequest::where('resident_id', $user->resident->id)
            ->where('request_status', 'pending')
            ->get();

        return response()->json($requests);
    }

    /**
     * Store a new car sticker request.
     */
    public function store(StoreCarStickerRequestRequest $request)
    {
        $user = $request->user();
        // Create the car sticker request
        $carStickerRequest = CarStickerRequest::create([
            'resident_id' => $user->resident->id,
            'car_model' => $request->car_model,
            'car_plate_number' => $request->car_plate_number,
            'request_status' => 'pending',
            'application_date' => now()
        ]);

        // Handle image uploads and create sticker documents
        if($request->has('images')){
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('sticker_documents','public');
                $documentUrl = Storage::disk('public')->url($path);
    
                StickerDocument::create([
                    'car_sticker_request_id' => $carStickerRequest->id,
                    'description' => $request->input('descriptions')[$index] ?? '',
                    'document_path' => $path,
                    'document_url' => $documentUrl,
                    'upload_date' => now()->toDateString(),
                ]);
            }
        }
        

        return response()->json(['message' => 'Car sticker request submitted successfully!'], 201);
    }

    private function storeImage($imageUri)
    {
        $image = file_get_contents($imageUri);
        $imageName = uniqid() . '.jpg';
        Storage::put('public/sticker_documents/' . $imageName, $image);

        return 'public/sticker_documents/' . $imageName;
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
