<?php

namespace App\Http\Controllers;

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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $houseExist = House::where('block',$request->block)
                            ->where('lot', $request->lot)
                            ->exists();

        if($houseExist){
            throw ValidationException::withMessages([
                'message'=> 'House already exist, block and lot must be unique.'
            ]);
        }

        $house = House::create([
            'block'=> $request->input('block'),
            'lot'=>$request->input('lot'),
            'house_type'=>$request->input('houseType'),
        ]);

        $generatedPassword = Str::password(12);
        $hashedPassword = Hash::make($generatedPassword);

        $user = User::create([
            'lastname'=>$request->input('lastname'),
            'firstname'=>$request->input('firstname'),
            'middlename'=>$request->input('middlename'),
            'role_type'=>'home_owner',
            'email'=>$request->input('email'),
            'password'=>$hashedPassword,
            'contact_number'=>$request->input('contactNumber'),
            'picture_url' => Storage::disk('public')->url('default_img.jpg'),
            'picture_path' => 'default_img.jpg',
        ]);

        $resident = Resident::create([
            'user_id'=>$user->id,
            'house_id'=>$house->id,
            'birthdate'=>$request->input('birthdate'),
            'sex'=>$request->input('sex'),
            'civi_status'=>$request->input('civilStatus'),
            'occupation_status'=>$request->input('occupation'),
            'fb_name'=>$request->input('facebook'),
        ]);

        for ($i = 0; $i < 5; $i++) {
            $bill = Bill::create([
                'resident_id' => $resident->id,
                'amount' => 1000,
                'due_date' => Carbon::now()->subMonths($i)->endOfMonth(),
                'status' => fake()->randomElement(['paid', 'pending', 'overdue']),
                'issue_date' => Carbon::now()->subMonths($i)->startOfMonth(),
            ]);

            // If the bill is marked as paid, create a corresponding transaction
            if ($bill->status == 'paid') {
                Transaction::create([
                    'resident_id' => $resident->id,
                    'bill_id' => $bill->id,
                    'amount' => $bill->amount,
                    // 'payment_method' => $faker->randomElement(['cash', 'gcash']),
                    'transaction_date' => Carbon::now()->subMonths($i)->endOfMonth(),
                ]);
            }
        }

        //email the resident about his account details
        Mail::to($user->email)->send(new SendPasswordMail(
            $user->firstname, 
            $user->email, 
            $generatedPassword));

        $house = $house->load(['residents', 'residents.user']);
        
        return response()->json(['message'=>'House successfuly created.', 
                                'house'=>$house]);
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