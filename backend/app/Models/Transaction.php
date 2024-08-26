<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'bill_id',
        'amount',
        // 'payment_method',
        'transaction_date'
    ];

    public function resident(): BelongsTo{
        return $this->belongsTo(Resident::class);
    }

    public function bill(): HasOne{
        return $this->hasOne(Bill::class);
    }
}