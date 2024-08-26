<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StickerPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'sticker_id',
        'amount',
        'payment_date',
        'payment_method',
        'transaction_id',
    ];

    public function carSticker()
    {
        return $this->belongsTo(CarSticker::class);
    }
}
