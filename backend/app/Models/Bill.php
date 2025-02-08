<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Bill extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'amount',
        'due_date',
        'status',
        'issue_date'
    ];

    public function resident(): BelongsTo{
        return $this->belongsTo(Resident::class);
    }

    public function transactions(): HasMany{
        return $this->hasMany(Transaction::class);
    }
}