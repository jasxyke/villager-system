<?php

namespace App\Http\Controllers;

use App\Models\PermitRequest;
use App\Http\Requests\StorePermitRequestRequest;
use App\Http\Requests\UpdatePermitRequestRequest;
use App\Models\Permit;
use App\Models\Resident;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\PermitClaimNotification;

class PermitRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
    }

    // Store a newly created permit request in storage
    public function store(StorePermitRequestRequest $request)
    {
        $validated = $request->validated();

        $user = $request->user();

        // Create the permit request with the generated reference number
        $permitRequest = PermitRequest::create([
            'resident_id' => $user->resident->id, // assuming the user is a resident
            'purpose' => $validated['purpose'],
            'permit_type' => $validated['clearanceType'],
            'permit_status' => 'pending',
            'application_date' => now(),
            'expect_start_date' => $validated['expect_start_date'],
            'expect_end_date' => $validated['expect_end_date'],
            'reference_number' => PermitRequest::generateUniqueReference(), // Use the model method
        ]);

        // Handle document uploads
        if ($request->has('documents')) {
            foreach ($request->file('documents') as $index => $document) {
                $path = $document->store('permit_documents', 'public');
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
                ->whereIn('permit_status',['pending','rejected'])
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

    public function getApprovedRequests($residentId)
    {

        $relationships = ['resident', 'resident.user', 
        'resident.house', 'permitDocuments', 'permitPayments'];


        // Fetch all the requests of the user excluding 'pending' and 'rejected' statuses
        $requests = PermitRequest::with($relationships)
            ->where('resident_id', $residentId)
            ->whereNotIn('permit_status', ['pending', 'rejected'])  // Exclude pending and rejected
            ->orderBy('approval_date', 'desc')  // Sort by newest first
            ->get();

        return response()->json($requests);
    }

    public function getPermitRequestsByStatus($status)
{
    // Validate that the status is one of the allowed values
    if (!in_array($status, ['pending', 'rejected', 'to_pay', 'in_progress', 'to_claim', 'claimed'])) {
        return response()->json(['error' => 'Invalid status'], 400);
    }

    // Define relationships to load based on the status
    $relationships = ['resident', 'resident.user', 'resident.house', 'permitDocuments'];

    if (in_array($status, ['to_pay', 'in_progress', 'to_claim', 'claimed'])) {
        array_push($relationships, "permitPayments");
    }

    // Fetch permit requests with the given status, ordered by the most recent
    $requests = PermitRequest::with($relationships)
        ->where('permit_status', $status)
        ->orderBy('created_at', 'desc')  // Order by most recent
        ->paginate(10);

    // Return the requests as a JSON response
    return response()->json($requests, 200);
}


public function approve(Request $request, $id)
{
    // Validate the request
    $validatedData = $request->validate([
        'permit_fee' => 'required|numeric|min:0',
        'processing_fee' => 'required|numeric|min:0',
        'note' => 'nullable|string'
    ]);

    // Find the permit request by ID
    $permitRequest = PermitRequest::findOrFail($id);

    // Update the permit request fields
    $permitRequest->permit_fee = $validatedData['permit_fee'];
    $permitRequest->processing_fee = $validatedData['processing_fee'];
    $permitRequest->note = $validatedData['note'] ?? null;
    $permitRequest->permit_status = 'to_pay';
    $permitRequest->approval_date = now()->toDateString();
    $permitRequest->save();

    // Find the resident associated with the request
    // $resident = Resident::findOrFail($permitRequest->resident_id);

    // Send email notification to the resident (uncomment for production)
    // TODO: MAGGAWA NG EMAIL SENDER FOR PERMITS NAMAN

    return response()->json([
        'message' => 'Permit request approved and notification sent successfully.',
        'permitRequest' => $permitRequest
    ], 200);
}
    
    public function reject(Request $request, $id)
    {
        $request->validate([
            'note' => 'required|string|max:255', // Ensure note is provided for the rejection reason
        ]);

        try {
            // Find the permit request by ID
            $permitRequest = PermitRequest::findOrFail($id);

            // Update the request status to 'rejected' and add the rejection note
            $permitRequest->update([
                'permit_status' => 'rejected',
                'note' => $request->note,
            ]);

            // Get the resident associated with the permit request
            $resident = Resident::findOrFail($permitRequest->resident_id);

            // Send an email to the resident with the rejection reason (uncomment for production)
            // TODO: MAGGAWA NG EMAIL SENDER FOR PERMITS NAMAN

            return response()->json([
                'success' => true,
                'message' => 'Permit request rejected successfully, and the resident has been notified via email.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to reject the permit request: ' . $e->getMessage(),
            ], 500);
        }
    }

    
    public function completePermitRequest($id)
    {
        // Find the permit request by ID
        $permitRequest = PermitRequest::find($id);

        if (!$permitRequest) {
            return response()->json(['error' => 'Permit request not found.'], 404);
        }

        // Check if the request is eligible to be completed (must be approved or in_progress)
        if ($permitRequest->permit_status !== 'in_progress') {
            return response()->json(['error' => 'Permit request is not eligible to be completed.'], 400);
        }

        // Update the request status to "to_claim" and set the completed date
        $permitRequest->permit_status = 'to_claim';
        $permitRequest->completed_date = now();
        $permitRequest->save();

        // Create a new permit entry
        $permit = new Permit();
        $permit->resident_id = $permitRequest->resident_id;
        $permit->permit_request_id = $permitRequest->id;
        $permit->permit_type = 'building'; // Adjust logic as needed
        $permit->permit_status = 'active';
        $permit->issue_date = now();
        $permit->expiry_date = now()->addYear();
        $permit->save();

        // Send email notification with the claim stub
        Mail::to($permitRequest->resident->user->email) // Assuming resident is related to user with an email
            ->send(new PermitClaimNotification($permitRequest));

        return response()->json([
            'message' => 'Permit request marked as completed and permit created successfully. Notification email sent.',
            'permit_request' => $permitRequest,
            'permit' => $permit,
        ], 200);
    }

    public function claimPermitRequest($id)
    {
        // Find the permit request by ID
        $permitRequest = PermitRequest::find($id);

        if (!$permitRequest) {
            return response()->json(['error' => 'Permit request not found.'], 404);
        }

        // Check if the request is eligible to be claimed (must be completed)
        if ($permitRequest->permit_status !== 'to_claim') {
            return response()->json(['error' => 'Permit request is not eligible to be claimed.'], 400);
        }

        // Update the request status to "claimed" and set the claimed date
        $permitRequest->permit_status = 'claimed';
        $permitRequest->claimed_date = Carbon::now();
        $permitRequest->save();

        return response()->json([
            'message' => 'Permit request marked as claimed successfully.',
            'permit_request' => $permitRequest
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