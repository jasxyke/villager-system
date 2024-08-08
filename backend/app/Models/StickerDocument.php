<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StickerDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'sticker_id',
        'document_type',
        'document_path',
        'document_url',
        'upload_date'
    ];

    public function carSticker(): BelongsTo{
        return $this->belongsTo(CarSticker::class);
    }
}