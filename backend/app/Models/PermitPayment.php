<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermitPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'permit_request_id',
        'amount',
        'payment_date',
        'payment_status',
        'transaction_id',
    ];

    public function permitRequest()
    {
        return $this->belongsTo(PermitRequest::class, 'permit_request_id');
    }
}
