<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'store_name',
        'store_address',
        'picture_path'
    ];

    public function owner(): BelongsTo{
        return $this->belongsTo(Resident::class);
    }

    public function storeProducts(): HasMany{
        return $this->hasMany(Product::class);
    }
}