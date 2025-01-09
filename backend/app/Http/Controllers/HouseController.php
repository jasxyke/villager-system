<?php

namespace App\Http\Controllers;

use App\Helpers\ResidentAccountHelper;
use App\Models\House;
use App\Http\Requests\StoreHouseRequest;
use App\Http\Requests\UpdateHouseRequest;
use App\Mail\SendPasswordMail;
use App\Models\Bill;
use App\Models\Resident;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class HouseController extends Controller
{

    public function getHouseMembers (Request $request,$houseId){
        // Validate that the house exists
        $house = House::find($houseId);
        if (!$house) {
            return response()->json(['message' => 'House not found'], 404);
        }

        // Fetch the residents of the house
        $residents = Resident::with('user')
            ->where('house_id', $houseId)
            ->get();

        // Return the residents in a JSON response
        return response()->json([
            'house' => $house,
            'residents' => $residents,
        ]);
    }

    public function getHousesPerBlocks(Request $request){
        $blocks = $request->filteredBlocks;

        $houses = House::whereIn('block', $blocks)
                        ->orderBy('block', 'ASC')
                        ->orderBy('lot', 'ASC')
                        // ->groupBy('block')
                        ->paginate(20);

        return $houses;
    }

    public function getHousesPerBlock(Request $request, string $blockNumber){
        $houses = House::with(['residents','residents.user'])
                        ->where('block', $blockNumber)
                        ->orderBy('lot', 'ASC')
                        // ->orderBy('residentS.user.lastname', 'ASC')
                        ->get();
        return $houses;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHouseRequest $request)
    {
        $houseExist = House::where('block', $request->block)
                            ->where('lot', $request->lot)
                            ->exists();
    
        if ($houseExist) {
            throw ValidationException::withMessages([
                'message' => 'House already exists; block and lot must be unique.'
            ]);
        }
    
        $house = House::create([
            'block' => $request->input('block'),
            'lot' => $request->input('lot'),
            'house_type' => $request->input('houseType'),
        ]);
    
        // Use the helper to create the resident account
        $accountData = ResidentAccountHelper::createResidentAccount($request->all(), $house->id);
    
        // Create dummy bills (to be removed after demo phase)
        for ($i = 0; $i < 5; $i++) {
            $bill = Bill::create([
                'resident_id' => $accountData['resident']->id,
                'amount' => 1000,
                'due_date' => Carbon::now()->subMonths($i)->endOfMonth(),
                'status' => fake()->randomElement(['paid', 'pending', 'overdue']),
                'issue_date' => Carbon::now()->subMonths($i)->startOfMonth(),
            ]);
    
            if ($bill->status == 'paid') {
                Transaction::create([
                    'resident_id' => $accountData['resident']->id,
                    'bill_id' => $bill->id,
                    'amount' => $bill->amount,
                    'transaction_date' => Carbon::now()->subMonths($i)->endOfMonth(),
                ]);
            }
        }
    
        // Send email to the user
        Mail::to($accountData['user']->email)->send(new SendPasswordMail(
            $accountData['user']->firstname,
            $accountData['user']->email,
            $accountData['generatedPassword']
        ));
    
        $house = $house->load(['residents', 'residents.user']);
    
        return response()->json([
            'message' => 'House successfully created.',
            'house' => $house,
        ]);
    }

        public function search(Request $request)
    {
        $ownerName = $request->query('ownerName');

        $houses = House::whereHas('residents.user', function ($query) use ($ownerName) {
            $query->where('firstname', 'like', "%$ownerName%")
                ->orWhere('lastname', 'like', "%$ownerName%");
        })->with(['residents.user'])
        ->take(10) // Limit the results for better UX
        ->get();

        return response()->json($houses);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHouseRequest $request, House $house)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(House $house)
    {
        //
    }
}