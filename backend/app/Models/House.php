<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class House extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'block',
        'lot',
        'house_type'
    ];

    public function homeOwner(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function residents(): HasMany{
        return $this->hasMany(User::class);
    }
}
