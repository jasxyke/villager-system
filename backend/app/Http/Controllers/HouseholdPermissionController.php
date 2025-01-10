<?php

namespace App\Http\Controllers;

use App\Helpers\HouseholdPermissionHelper;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendPasswordMail;
use Illuminate\Validation\Rule;

class HouseholdPermissionController extends Controller
{

    public function createAccount(Request $request)
    {
        $validated = $request->validate([
            'email' => [
                'required',
                'string',
                'email:rfc,dns',
                'max:255',
                Rule::unique('users')->ignore($request->user_id),
            ],
            'house_id' => 'required|exists:houses,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $user = User::find($validated['user_id']);
        $newPermissions = $request->permissions ?? [];

        if ($user && $user->password) {
            // Update permissions
            HouseholdPermissionHelper::updateUserPermissions(
                $validated['house_id'],
                $validated['user_id'],
                $newPermissions
            );

            return response()->json([
                'message' => "Permissions updated successfully.",
                'grantedPermissions' => $newPermissions,
            ]);
        }

        // Generate and hash the password for a new user
        $generatedPassword = Str::password(8);
        $hashedPassword = Hash::make($generatedPassword);

        // Update or create the user's email and password
        $user->update([
            'password' => $hashedPassword,
            'email' => $validated['email'],
        ]);

        // Grant initial permissions to the new user
        HouseholdPermissionHelper::updateUserPermissions(
            $validated['house_id'],
            $validated['user_id'],
            $newPermissions
        );

        // Send the password email
        Mail::to($user->email)->send(new SendPasswordMail(
            $user->firstname,
            $user->email,
            $generatedPassword
        ));

        return response()->json([
            'message' => "House member account successfully created. Account details were sent to the given email.",
            'grantedPermissions' => $newPermissions,
        ]);
    }



    /**
     * Grant permission to a user for a specific household.
     */
    public function grantPermission(Request $request)
    {
        $validated = $request->validate([
            'house_id' => 'required|exists:houses,id',
            'user_id' => 'required|exists:users,id',
            'permission_type' => 'required|in:view,manage',
            'expires_at' => 'nullable|date|after:now',
        ]);

        try {
            HouseholdPermissionHelper::grantPermission(
                $validated['house_id'],
                $validated['user_id'],
                $validated['permission_type'],
                $validated['expires_at'] ?? null
            );

            return response()->json(['message' => 'Permission granted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    /**
     * Revoke a user's permission for a household.
     */
    public function revokePermission(Request $request)
    {
        $validated = $request->validate([
            'permission_id' => 'required|exists:household_permissions,id',
        ]);

        try {
            HouseholdPermissionHelper::revokePermission($validated['permission_id']);

            return response()->json(['message' => 'Permission revoked successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    /**
     * List all permissions for a given house.
     */
    public function listPermissions($houseId)
    {
        try {
            $permissions = HouseholdPermissionHelper::listPermissions($houseId);

            return response()->json($permissions);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }
}