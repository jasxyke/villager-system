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
    ];

    public function booking(): HasOne{
        return $this->hasOne(Booking::class);
    }

    
}