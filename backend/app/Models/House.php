<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class House extends Model
{
    use HasFactory;

    protected $fillable = [
        'block',
        'lot',
        'house_type'
    ];

    public function residents(): HasMany{
        return $this->hasMany(Resident::class);
    }
}
