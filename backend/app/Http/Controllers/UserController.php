<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
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
        $user = User::find($id);
        $fields = $request->validate([
            'lastname'=> 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'middlename' => 'required|string|max:255',
            'fbName' => 'required|string|max:150',
        ]);

        //return response()->json(['user'=>$fields]);

        $user->update($fields);
        
        $resident = Resident::find($user->id);
        $resident->fb_name = $fields["fbName"];
        $resident->civil_status = $request->input('civilStatus');
        $resident->occupation_status = $request->input('occupation');
        $resident->save();
        
        $user = $user->load('resident','resident.house');
        return response()->json(['message'=>'Profile succesfuly updated!', 'user'=>$user]);
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOr($id, function (){
            throw ValidationException::withMessages([
                'message'=>"User not found, cannot be deleted."
            ]);
        });

        $user->delete();

        return response()->json(['message'=>'User successfuly deleted.']);
    }

    public function changePicture(Request $request): string{
        $request->validate(['profile_pic' => 'required|image|mimes:jpeg,png,jpg']);
        
        $path = $request->file('profile_pic')->store('profile_pics','public');
        $url = Storage::disk('public')->url($path);
        
        $user = $request->user();
        if($user->picture_path !== null){
            Storage::delete($user->picture_path);
        }
        $user->picture_url = $url;
        $user->picture_path = $path;
        $user->save();
        
        return $url;
    }

    public function changePassword(Request $request){
        $fields = $request->validate([
            'old_password' => 'required',
            'new_password' => ['required',
                            'string',
                            'min:8',
                            Password::min(8)
                                ->mixedCase()
                                ->numbers()
                                ->uncompromised(),
                            'confirmed'],
        ]);

        if(!Hash::check($fields['old_password'], auth()->user()->password)){
            throw ValidationException::withMessages([
                'password' => ['Passwords do not match.']
            ]);
        }

        User::whereId(auth()->user()->id)->update([
            'password' => Hash::make($fields['new_password'])
        ]);

        return response()->json(['message' => 'Password successfuly changed.']);
    }
}