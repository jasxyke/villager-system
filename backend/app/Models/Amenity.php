<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Amenity extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'day_price',
        'night_price',
        'day_per_person_price',
        'night_per_person_price',
        'guest_additional_price',
        'extension_price'
    ];

    public function booking(): HasOne{
        return $this->hasOne(Booking::class);
    }

    
}