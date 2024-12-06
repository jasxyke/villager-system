<?php

namespace App\Http\Controllers;

use App\Models\CarStickerRequest;
use App\Http\Requests\StoreCarStickerRequestRequest;
use App\Http\Requests\UpdateCarStickerRequestRequest;
use App\Mail\CarStickerFeeNotification;
use App\Mail\CarStickerRejectedMail;
use App\Models\CarSticker;
use App\Models\Resident;
use App\Models\StickerDocument;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
class CarStickerRequestController extends Controller
{

    public function getRequestsByStatus($status)
    {
        // Validate that the status is one of the allowed values
        if (!in_array($status, ['pending', 'approved', 'rejected', 'in_progress', 'completed', 'claimed'])) {
            return response()->json(['error' => 'Invalid status'], 400);
        }

        $relationships = ['resident','resident.user','resident.house','stickerDocuments'];

        if($status !== "pending" && $status !== "approved" && $status !== "rejected"){
            array_push($relationships, "stickerPayments", "carSticker");
        }

        // Fetch car sticker requests with the given status, ordered by most recent
        $requests = CarStickerRequest::with($relationships)
            ->where('request_status', $status)
            ->orderBy('created_at', 'desc')  // Order by the most recent
            ->paginate(10);

        // Return the requests as a JSON response
        return response()->json($requests, 200);
    }

    //this is for the resident
    public function getPendingRequests(Request $request)
    {
        //this is for the resident
        $user = $request->user();

        // Validate resident ID
        if (!$user->resident->id) {
            return response()->json(['message' => 'Resident ID is required'], 400);
        }

        // Fetch pending car sticker requests
        $requests = CarStickerRequest::where('resident_id', $user->resident->id)
            ->whereIn('request_status', ['pending','rejected'])
            ->get();

        return response()->json($requests);
    }

    /**
     * Store a new car sticker request.
     */
    public function store(StoreCarStickerRequestRequest $request)
    {
        $user = $request->user();
        $referenceNumber = CarStickerRequest::generateUniqueReference();
        // Create the car sticker request
        $carStickerRequest = CarStickerRequest::create([
            'resident_id' => $user->resident->id,
            'reference_number'=> $referenceNumber,
            'car_model' => $request->car_model,
            'car_plate_number' => $request->car_plate_number,
            'sticker_type' => $request->sticker_type, // New field
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
    // set the car sticker request as claimed
    public function claimStickerRequest($id)
    {
        // Find the sticker request by ID
        $stickerRequest = CarStickerRequest::find($id);

        if (!$stickerRequest) {
            return response()->json(['error' => 'Sticker request not found.'], 404);
        }

        // Check if the request is eligible to be claimed (must be completed)
        if ($stickerRequest->request_status !== 'completed') {
            return response()->json(['error' => 'Sticker request is not eligible to be claimed.'], 400);
        }

        // Update the request status to "claimed" and set the claimed date
        $stickerRequest->request_status = 'claimed';
        $stickerRequest->claimed_date = Carbon::now();
        $stickerRequest->save();

        return response()->json([
            'message' => 'Sticker request marked as claimed successfully.',
            'sticker_request' => $stickerRequest
        ], 200);
    }

    public function completeStickerRequest($id)
    {
        // Find the sticker request by ID
        $stickerRequest = CarStickerRequest::find($id);

        if (!$stickerRequest) {
            return response()->json(['error' => 'Sticker request not found.'], 404);
        }

        // Check if the request is eligible to be completed (must be approved or in_progress)
        if ($stickerRequest->request_status !== 'approved' && $stickerRequest->request_status !== 'in_progress') {
            return response()->json(['error' => 'Sticker request is not eligible to be completed.'], 400);
        }

        // Update the request status to "completed" and set the completed date
        $stickerRequest->request_status = 'completed';
        $stickerRequest->completed_date = Carbon::now();
        $stickerRequest->save();

        // Create a new car sticker entry
        $carSticker = new CarSticker();
        $carSticker->resident_id = $stickerRequest->resident_id;
        $carSticker->car_sticker_request_id = $stickerRequest->id;
        $carSticker->sticker_status = 'active';
        $carSticker->issue_date = Carbon::now();  // Set issue date to now
        $carSticker->expiry_date = Carbon::now()->addYear();  // Expiry date set to one year from now
        $carSticker->save();

        return response()->json([
            'message' => 'Sticker request marked as completed and car sticker created successfully.',
            'sticker_request' => $stickerRequest,
            'car_sticker' => $carSticker
        ], 200);
    }

    public function approveRequest(Request $request, $id)
    {
        // Validate the request
        $validatedData = $request->validate([
            'sticker_fee' => 'required|numeric|min:0',
            'processing_fee' => 'required|numeric|min:0',
            'note' => 'nullable|string'
        ]);

        // Find the car sticker request by ID
        $stickerRequest = CarStickerRequest::findOrFail($id);

        // Update the car sticker request fields
        $stickerRequest->sticker_fee = $validatedData['sticker_fee'];
        $stickerRequest->processing_fee = $validatedData['processing_fee'];
        $stickerRequest->note = $validatedData['note'] ?? null;
        $stickerRequest->request_status = 'approved';
        $stickerRequest->approval_date = now()->toDateString();
        $stickerRequest->save();

        //============================================================
        //TODO: UNCOMMENT NA TO KAPAG PROPER EMAIL NA YUNG TETESTING
        //============================================================
        // // Find the resident associated with the request
        // $resident = Resident::findOrFail($stickerRequest->resident_id);

        // // Send email notification to the resident
        // Mail::to($resident->user->email)->send(new CarStickerFeeNotification($stickerRequest));

        return response()->json([
            'message' => 'Sticker request updated and notification sent successfully.',
            'stickerRequest' => $stickerRequest
        ], 200);
    }

    public function rejectRequest(Request $request, $id)
    {
        $request->validate([
            'note' => 'required|string|max:255', // Ensure note is provided for the rejection reason
        ]);

        try {
            // Find the car sticker request by ID
            $carStickerRequest = CarStickerRequest::findOrFail($id);

            // Update the request status to 'rejected' and add the rejection note
            $carStickerRequest->update([
                'request_status' => 'rejected',
                'note' => $request->note,
            ]);


            /*
            ==============================================================
            TODO: UNCOMMENT YUNG PAG SEND NG EMAIL KAPAG PROPER TESTING NA
            ===============================================================
            */
            // Get the resident associated with the car sticker request
            // $resident = Resident::findOrFail($carStickerRequest->resident_id);

            // // Send an email to the resident with the rejection reason
            // Mail::to($resident->user->email)->send(new CarStickerRejectedMail($carStickerRequest));

            return response()->json([
                'success' => true,
                'message' => 'Car sticker request rejected successfully, and the resident has been notified via email.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to reject the car sticker request: ' . $e->getMessage(),
            ], 500);
        }
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