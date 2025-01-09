<?php

namespace App\Helpers;

use App\Models\User;
use App\Models\Resident;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ResidentAccountHelper
{
    /**
     * Create a resident account with the provided data.
     *
     * @param array $userData
     * @param int $houseId
     * @return array
     */
    public static function createResidentAccount(array $userData, int $houseId): array
    {
        $generatedPassword = Str::password(12);
        $hashedPassword = Hash::make($generatedPassword);

        $user = User::create([
            'lastname' => $userData['lastname'],
            'firstname' => $userData['firstname'],
            'middlename' => $userData['middlename'],
            'role_type' => 'home_owner',
            'email' => $userData['email'],
            'password' => $hashedPassword,
            'contact_number' => $userData['contactNumber'],
            'picture_url' => Storage::disk('public')->url('default_img.jpg'),
            'picture_path' => 'default_img.jpg',
        ]);

        $resident = Resident::create([
            'user_id' => $user->id,
            'house_id' => $houseId,
            'birthdate' => $userData['birthdate'],
            'sex' => $userData['sex'],
            'civi_status' => $userData['civilStatus'],
            'occupation_status' => $userData['occupation'],
            'fb_name' => $userData['facebook'],
        ]);

        return [
            'user' => $user,
            'resident' => $resident,
            'generatedPassword' => $generatedPassword,
        ];
    }
}