<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\Request;

class ComplaintController extends Controller
{
   // Get all complaints
   public function index()
   {
       return Complaint::all();
   }

    // Store a new complaint
    public function store(Request $request)
    {
        $request->validate([
            'resident_id' => 'required|exists:residents,id',
            'type' => 'required|in:Noise,Dispute',
        ]);

        $complaint = Complaint::create([
            'resident_id' => $request->resident_id,
            'status' => 'Pending',  // Default status
            'type' => $request->type,
            'date_sent' => now(),  // Set the current date
            'message'=>$request->message
        ]);

        return response()
        ->json(["message"=>"Sucessfuly sent a complaint!"], 201);
    }

   // Show a specific complaint
   public function show($id)
   {
       $complaint = Complaint::findOrFail($id);
       return response()->json($complaint);
   }

   // Update a complaint
   public function update(Request $request, $id)
   {
       $complaint = Complaint::findOrFail($id);

       $request->validate([
           'resident_id' => 'required|exists:residents,id',
           'status' => 'required|in:Pending,Solved',
           'type' => 'required|in:Noise,Dispute',
           'date_sent' => 'required|date',
           'message'=>"required|string",
       ]);

       $complaint->update($request->all());
       return response()->json($complaint);
   }

   // Delete a complaint
   public function destroy($id)
   {
       $complaint = Complaint::findOrFail($id);
       $complaint->delete();

       return response()->json(null, 204);
   }
}