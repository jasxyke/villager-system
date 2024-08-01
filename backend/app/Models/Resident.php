<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Resident extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'birthdate',
        'sex',
        'address_id',
        'civil_status',
        'occupation_status',
        'fb_name'
    ];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function address(): HasOne{
        return $this->hasOne(Address::class);
    }

    public function bills(): HasMany{
        return $this->hasMany(Bill::class);
    }

    public function permits(): HasMany{
        return $this->hasMany(Permit::class);
    }

    public function carStickers(): HasMany{
        return $this->hasMany(CarSticker::class);
    }

    public function feedbacks(): HasMany{
        return $this->hasMany(Feedback::class);
    }

    public function transactions(): HasMany{
        return $this->hasMany(Transaction::class);
    }

    public function store(): HasOne{
        return $this->hasOne(Store::class);
    }
}