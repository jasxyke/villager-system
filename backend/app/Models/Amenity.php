<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Amenity extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];

    public function booking(): BelongsTo{
        return $this->belongsTo(Booking::class);
    }

    
}