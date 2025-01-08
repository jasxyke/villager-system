<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HouseholdPermission extends Model
{
    use HasFactory;

    protected $fillable = [
        'house_id',
        'user_id',
        'granted_by',
        'permission_type',
        'granted_at',
        'expires_at',
    ];

    /**
     * Get the house that owns the permission.
     */
    public function house()
    {
        return $this->belongsTo(House::class);
    }

    /**
     * Get the user that has the permission.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the user that granted the permission.
     */
    public function grantedBy()
    {
        return $this->belongsTo(User::class, 'granted_by');
    }
}