<?php

namespace App\Http\Controllers;

use App\Models\PermitRequest;
use App\Http\Requests\StorePermitRequestRequest;
use App\Http\Requests\UpdatePermitRequestRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PermitRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Fetch all permit requests and sort them by application_date in descending order
            $permitRequests = PermitRequest::with(['resident.user','resident.house','permitDocuments',])
                            ->orderBy('application_date', 'desc')->get();

            return response()->json($permitRequests);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching permit requests.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Store a newly created permit request in storage
    public function store(StorePermitRequestRequest $request)
    {
        $validated = $request->validated();

        $user = $request->user();
        // Create the permit request
        $permitRequest = PermitRequest::create([
            'resident_id' => $user->resident->id, // assuming the user is a resident
            'purpose' => $validated['purpose'],
            'floor_size' => $validated['floorSize'],
            'permit_status' => 'pending',
            'application_date' => now(),
        ]);

        // Handle document uploads
        if ($request->has('documents')) {
            foreach ($request->file('documents') as $index => $document) {
                $path = $document->store('permit_documents','public');
                $url = Storage::disk('public')->url($path);
                $permitRequest->permitDocuments()->create([
                    'description' => $request->input('descriptions')[$index] ?? '',
                    'document_path' => $path,
                    'document_url' => $url,
                    'upload_date' => now(),
                ]);
            }
        }

        return response()->json([
            'message' => 'Permit request submitted successfully.',
            'permit_request' => $permitRequest,
        ], 201);
    }

    public function getPermitRequestsByResident($residentId)
    {
        try {
            // Fetch permit requests for the given resident ID
            $permitRequests = PermitRequest::where('resident_id', $residentId)
                // ->with('permitDocuments')  // Include related documents
                ->get();

            // Return a JSON response with the permit requests
            return response()->json([
                'message' => 'Permit requests fetched successfully.',
                'permits' => $permitRequests,
            ], 200);
        } catch (\Exception $e) {
            // Handle any exceptions that may occur
            return response()->json([
                'message' => 'An error occurred while fetching permit requests.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function approve(Request $request, $id)
    {
        // Validate incoming data
        $validatedData = $request->validate([
            'processing_fee' => 'required|numeric|min:0',
            'permit_fee' => 'required|numeric|min:0',
            'note' => 'nullable|string|max:500',
        ]);

        // Find the permit request by ID
        $permitRequest = PermitRequest::findOrFail($id);

        // Update the permit status to approved and set other details
        $permitRequest->permit_status = 'to pay';
        $permitRequest->processing_fee = $validatedData['processing_fee'];
        $permitRequest->permit_fee = $validatedData['permit_fee'];
        $permitRequest->note = $validatedData['note'];
        $permitRequest->save();

        // Return a JSON response
        return response()->json([
            'message' => 'Permit request approved successfully.',
            'permit_request' => $permitRequest,
        ], 200);
    }

    /**
     * Reject a permit request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function reject(Request $request, $id)
    {
        // Validate incoming data
        $validatedData = $request->validate([
            'reason' => 'required|string|max:500',
        ]);

        // Find the permit request by ID
        $permitRequest = PermitRequest::findOrFail($id);

        // Update the permit status to rejected and set the reason
        $permitRequest->permit_status = 'rejected';
        $permitRequest->note = $validatedData['reason'];
        $permitRequest->save();

        // Return a JSON response
        return response()->json([
            'message' => 'Permit request rejected successfully.',
            'permit_request' => $permitRequest,
        ], 200);
    }



    /**
     * Display the specified resource.
     */
    public function show(PermitRequest $permitRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PermitRequest $permitRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermitRequestRequest $request, PermitRequest $permitRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PermitRequest $permitRequest)
    {
        //
    }
}
