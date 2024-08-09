<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'lastname' => 'required|string|max:100',
            'firstname' => 'required|string|max:150',
            'middlename' => 'string|max:100',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => Password::min(8)
                            ->mixedCase()
                            ->numbers()
                            ->symbols()
                            ->uncompromised(),
            'contact_number'=> 'required|string|min:11|unique:users',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'lastname' => $request->lastname,
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'contact_number'=> $request->contact_number,
            'role_type' => 'guest',
            'picture_url' => Storage::disk('public')->url('default_img.jpg'),
            'picture_path' => 'default_img.jpg'
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token ], 201);
    }


    public function login(Request $request){
        $request->validate([
            'email'=>'required|string|email:rfc,dns|email',
            'password'=>'required|string'
        ]);
        
        $user = User::where('email', $request->email)->first();
 
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }


    // Logout the user (revoke token)
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully!']);
    }

    public function me(Request $request){
        $user = $request->user();
        if($user->role_type == 'resident'){
            return $user->load('resident','resident.address');
        }
        if($user->role_type == 'guest'){
            return $user;
        } 
    }
}