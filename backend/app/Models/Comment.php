<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'user_id',
        'content'
    ];

    public function product(): BelongsTo{
        return $this->belongsTo(Product::class);
    }

    public function resident(): BelongsTo{
        return $this->belongsTo(Resident::class);
    }
}