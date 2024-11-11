<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use App\Http\Requests\StoreResidentRequest;
use App\Http\Requests\UpdateResidentRequest;
use App\Models\House;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ResidentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Resident::with('user')->paginate(20);
        return User::whereIn('role_type',['home_owner','member','tenant','seller'])
                ->with('resident','resident.house')
                ->orderByRaw("role_type = 'home_owner' ASC")
                ->orderByRaw("role_type = 'memeber' ASC")
                ->orderByRaw("role_type = 'tenant' ASC")
                ->orderByRaw("role_type = 'seller' ASC")
                ->orderBy('lastname', 'ASC')
                ->paginate(20);
    }

    public function getResidentsPerBlock(Request $request, string $blockNumber){
        // $users = User::with('resident','resident.house')
        //     ->where('role_type','=','resident')
        //     ->whereRelation('resident.house','block','=',$blockNumber)
        //     ->orderBy('lastname','asc')
        //     ->paginate(20);
        //kapag ready na yung pagination, uncomment mo na yung nasa taas
        $users = User::with('resident','resident.house')
        ->where('role_type','=','resident')
        ->whereRelation('resident.house','block','=',$blockNumber)
        // ->orderBy('lastname','asc')
        ->paginate(20);
        // ->take(20)->get();
        return $users;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResidentRequest $request)
    {
        $user = User::create([
            'lastname'=>$request->input('lastname'),
            'firstname'=>$request->input('firstname'),
            'middlename'=>$request->input('middlename'),
            'role_type'=>$request->roleType,
            'email'=>$request->input('email'),
            'contact_number'=>$request->input('contactNumber'),
        ]);

        $resident =  Resident::create([
            'user_id'=>$user->id,
            'house_id'=>$request->houseId,
            'birthdate'=>$request->input('birthdate'),
            'sex'=>$request->input('sex'),
            'civil_status'=>$request->input('civilStatus'),
            'occupation_status'=>$request->input('occupation'),
            'fb_name'=>$request->input('facebook'),
        ]);

        $resident = $resident->load(['user']);

        return response()->json(['message'=> "Member successfuly added.", 
                        'resident'=>$resident]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Resident $resident)
    {
        //
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResidentRequest $request, string $id)
    {
        $user = User::findOr($id, function (){
            throw ValidationException::withMessages([
                'message'=>'Resident not found.'
            ]);
        });
        $resident = Resident::where('user_id','=',$user->id)->first();

        //update user columns
        $user->lastname = $request->input('lastname');
        $user->firstname = $request->input('firstname');
        $user->middlename = $request->input('middlename');
        $user->email = $request->input('email');
        $user->role_type = $request->input('roleType');
        $user->contact_number = $request->input('contactNumber');
        $user->save();

        $resident->birthdate = $request->input('birthdate');
        $resident->sex = $request->input('sex');
        $resident->civil_status = $request->input('civilStatus');
        $resident->fb_name = $request->input('facebook');
        $resident->occupation_status = $request->input('occupation');
        $resident->save();

        if($request->isFromHouse){
            $user = $resident->load(['user','house']);
        }else{
            $user = $user->load(['resident','resident.house']);
        }
        return response()->json(['message'=> 'Resident edited!', 'user'=> $user]);

    }

    public function getTotalResidents()
    {
        $totalResidents = Resident::count(); // Get the total number of residents
        return response()->json(['total_residents' => $totalResidents]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resident $resident)
    {
        //
    }
}