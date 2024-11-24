<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarStickerRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'car_model',
        'car_plate_number',
        'request_status',
        'application_date',
        'approval_date',
        'note',
        'sticker_type'
    ];

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }

    public function carSticker()
    {
        return $this->hasOne(CarSticker::class);
    }

    public function stickerPayments()
    {
        return $this->hasMany(StickerPayment::class);
    }

    public function stickerDocuments()
    {
        return $this->hasMany(StickerDocument::class);
    }
}