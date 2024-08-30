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
        'civil_status',
        'occupation_status',
        'fb_name',
        'house_id'
    ];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function house(): BelongsTo{
        return $this->belongsTo(House::class);
    }

    public function bills(): HasMany{
        return $this->hasMany(Bill::class);
    }

    public function permits(): HasMany{
        return $this->hasMany(Permit::class);
    }

    public function permitRequests(): HasMany{
        return $this->hasMany(PermitRequest::class);
    }

    public function permitPayments(): HasMany{
        return $this->hasMany(PermitPayment::class);
    }

    public function carStickerRequests()
    {
        return $this->hasMany(CarStickerRequest::class);
    }

    public function carStickerPayments(){
        return $this->hasMany(StickerPayment::class);
    }

    public function carStickers()
    {
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