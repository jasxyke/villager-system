<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CarStickerRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'reference_number',
        'car_model',
        'car_plate_number',
        'request_status',
        'application_date',
        'approval_date',
        'note',
       // 'sticker_type'
    ];

    public static function generateUniqueReference(): string
    {
        do {
            $reference = 'CS-' . strtoupper(Str::random(7));
        } while (self::where('reference_number', $reference)->exists());

        return $reference;
    }

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