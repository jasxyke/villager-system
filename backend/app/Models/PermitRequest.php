<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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
        'expect_start_date',
        'expect_end_date',
        'reference_number'
        // 'floor_size'
    ];

    public static function generateUniqueReference(): string
    {
        do {
            $reference = 'CR-' . strtoupper(Str::random(10));
        } while (self::where('reference_number', $reference)->exists());

        return $reference;
    }

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