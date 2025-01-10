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
            'email' => 'required|string|email:rfc,dns|email|max:255|unique:users',
            'password' => Password::min(8)
                            ->mixedCase()
                            ->numbers()
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


    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|string|email', // Validation for email
        'password' => 'required|string', // Validation for password
        'isMobile' => 'required|boolean' // Ensure `isMobile` is a boolean
    ]);
    
    $user = User::where('email', $request->email)->first();

    // If user not found
    if (!$user) {
        throw ValidationException::withMessages([
            'message' => 'User not found.'
        ]);
    }

    // Role-based authentication
    if (!$request->isMobile) {
        // Web login check for 'admin' or 'treasurer' roles only
        if ($user->role_type !== 'admin' && $user->role_type !== 'treasurer') {
            throw ValidationException::withMessages([
                'message' => 'Unauthenticated user!'
            ]);
        }
    } else {
        // Mobile login check for 'home_owner' role only
        if (!in_array($user->role_type, ['member','home_owner','seller','tenant'])) {
            throw ValidationException::withMessages([
                'message' => 'Unauthenticated user!'
            ]);
        }
    }

    // Check for password validity
    if (!Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'message' => 'The provided credentials are incorrect.'
        ]);
    }

    // Create a new token for authenticated user
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
        if(in_array($user->role_type, ['home_owner','member','tenant','seller'])){
            return $user->load('resident','resident.house', 'householdPermissions');
        }
        if($user->role_type == 'admin'){
            return $user->load('admin');
        }
        return $user;
    }
}