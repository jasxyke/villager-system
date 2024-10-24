<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StickerPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_sticker_request_id',
        'amount',
        'payment_date',
        'payment_status',
        'transaction_id',
    ];

    public function resident(){
        return $this->belongsTo(Resident::class);
    }

    public function carStickerRequest()
    {
        return $this->belongsTo(CarStickerRequest::class);
    }
}