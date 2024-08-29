<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermitRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'purpose',
        'floor_size',
        'permit_status',
        'application_date',
        'approval_date',
    ];

    /**
     * Get the resident associated with the permit request.
     */
    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }

    /**
     * Get the permit associated with the approved request.
     */
    public function permit()
    {
        return $this->hasOne(Permit::class);
    }
}
