<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::where('role_type','=','guest')->paginate(20);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $fields = $request->validate([
            'lastname'=> 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'middlename' => 'required|string|max:255',
            'fbName' => 'required|string|max:150',
        ]);

        //return response()->json(['user'=>$fields]);
        $user = User::find($id);
        $user->update($fields);
        
        $resident = Resident::find($user->id);
        $resident->fb_name = $fields["fbName"];
        $resident->civil_status = $request->input('civilStatus');
        $resident->occupation_status = $request->input('occupation');
        $resident->save();
        
        $user = $user->load('resident','resident.address');
        return response()->json(['message'=>'Profile succesfuly updated!', 'user'=>$user]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function changePicture(Request $request): string{
        $request->validate(['profile_pic' => 'required|image|mimes:jpeg,png,jpg']);
        
        $path = $request->file('profile_pic')->store('profile_pics','public');
        $url = Storage::disk('public')->url($path);
        
        $user = $request->user();
        if($user->picture_path !== null || $user->picture_path !== ""){
            Storage::delete($user->picture_path);
        }
        $user->picture_url = $url;
        $user->picture_path = $path;
        $user->save();
        
        return $url;
    }
}