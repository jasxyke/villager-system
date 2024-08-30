<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermitRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'permit_status',
        'application_date',
        'approval_date',
        'note',
        'purpose',
        'floor_size'
    ];

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }

    public function permitDocuments()
    {
        return $this->hasMany(PermitDocument::class);
    }

    public function permitPayments()
    {
        return $this->hasMany(PermitPayment::class);
    }
}
