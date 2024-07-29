<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'store_id',
        'name',
        'description',
        'price',
        'quantity',
        'picture_path'
    ];

    public function seller(): BelongsTo{
        return $this->belongsTo(Resident::class);
    }

    public function store(): BelongsTo{
        return $this->belongsTo(Store::class);
    }

    public function comments(): HasMany{
        return $this->hasMany(Comment::class);
    }
}