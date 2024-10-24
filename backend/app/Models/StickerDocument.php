<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StickerDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_sticker_request_id',
        'description',
        'document_path',
        'document_url',
        'upload_date'
    ];

    public function carStickerRequest()
    {
        return $this->belongsTo(CarStickerRequest::class);
    }
}