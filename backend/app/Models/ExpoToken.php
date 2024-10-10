<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExpoToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'expo_token'
    ];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
}
