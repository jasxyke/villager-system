<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PermitPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'permit_id',
        'amount',
        'payment_date',
        'payment_method',
        'transaction_id',
    ];

    public function permit(): BelongsTo
    {
        return $this->belongsTo(Permit::class);
    }
}
