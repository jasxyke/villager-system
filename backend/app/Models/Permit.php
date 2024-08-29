<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permit extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'permit_request_id',
        'permit_type',
        'permit_status',
        'issue_date',
        'expiry_date',
    ];

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }

    public function permitRequest()
    {
        return $this->belongsTo(PermitRequest::class);
    }
}
