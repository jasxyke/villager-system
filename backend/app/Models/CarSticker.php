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
        'car_model',
        'car_plate_number',
        'sticker_status',
        'issue_date',
        'expiry_date',
        'application_date',
        'comments'
    ];

    public function applicant(): BelongsTo{
        return $this->belongsTo(Resident::class);
    }

    public function stickerDocuments(): HasMany{
        return $this->hasMany(StickerDocument::class);
    }
}