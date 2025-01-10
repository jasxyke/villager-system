<?php

namespace App\Helpers;

use App\Models\HouseholdPermission;
use App\Models\User;
use App\Models\House;
use Illuminate\Support\Facades\Auth;

class HouseholdPermissionHelper
{
    /**
     * Grant permission to a user for a specific household.
     */
    public static function grantPermission($houseId, $userId, $permissionType, $expiresAt = null)
    {
        $house = House::findOrFail($houseId);

        // Ensure only home_owners can grant permissions
        $homeOwner = Auth::user();
        if ($homeOwner->role_type !== 'home_owner') {
            throw new \Exception('Unauthorized', 403);
        }

        // Create the permission
        return HouseholdPermission::create([
            'house_id' => $house->id,
            'user_id' => $userId,
            'granted_by' => $homeOwner->id,
            'permission_type' => $permissionType,
            'expires_at' => $expiresAt,
        ]);
    }

    /**
     * Grant multiple permissions to a single user for a specific household.
     */
    public static function grantMultiplePermissionsToUser($houseId, $userId, array $permissionTypes, $expiresAt = null)
    {
        $house = House::findOrFail($houseId);

        // Ensure only home_owners can grant permissions
        $homeOwner = Auth::user();
        if ($homeOwner->role_type !== 'home_owner') {
            throw new \Exception('Unauthorized', 403);
        }

        $createdPermissions = [];

        foreach ($permissionTypes as $permissionType) {
            $createdPermissions[] = HouseholdPermission::create([
                'house_id' => $house->id,
                'user_id' => $userId,
                'granted_by' => $homeOwner->id,
                'permission_type' => $permissionType,
                'expires_at' => $expiresAt,
            ]);
        }

        return $createdPermissions;
    }

    /**
     * Revoke a user's permission for a household.
     */
    public static function revokePermission($permissionId)
    {
        $permission = HouseholdPermission::findOrFail($permissionId);

        // Ensure only the granting home_owner can revoke permissions
        if ($permission->granted_by !== Auth::user()->id) {
            throw new \Exception('Unauthorized', 403);
        }

        $permission->delete();

        return true;
    }

    /**
     * List all permissions for a given house.
     */
    public static function listPermissions($houseId)
    {
        return HouseholdPermission::where('house_id', $houseId)
            ->with(['user', 'grantedBy'])
            ->get();
    }
}