<?php

namespace App\Http\Controllers;

use App\Helpers\HouseholdPermissionHelper;
use Illuminate\Http\Request;

class HouseholdPermissionController extends Controller
{
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