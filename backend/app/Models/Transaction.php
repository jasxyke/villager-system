<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'bill_id',
        'amount',
        'payment_method',
        'transaction_date',
        'reference_number'
    ];

    public static function generateUniqueReference(): string
    {
        do {
            $reference = 'MD-' . strtoupper(Str::random(7));
        } while (self::where('reference_number', $reference)->exists());

        return $reference;
    }

    public function resident(): BelongsTo{
        return $this->belongsTo(Resident::class);
    }

    public function bill(): BelongsTo{
        return $this->belongsTo(Bill::class);
    }
}