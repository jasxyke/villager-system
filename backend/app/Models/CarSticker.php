<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CarSticker extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'car_sticker_request_id',
        'sticker_status',
        'issue_date',
        'expiry_date',
    ];

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }

    public function carStickerRequest()
    {
        return $this->belongsTo(CarStickerRequest::class);
    }
}