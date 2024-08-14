<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        // 'user_id',
        'amenity_id',
        'booking_date',
        'start_time',
        'end_time',
        //new fields
        'full_name',
        'email',
        'contact_number',
        'booking_status',
        'booking_type'
    ];

    // public function user(): BelongsTo{
    //     return $this->belongsTo(User::class);
    // }

    public function amenity(): HasOne{
        return $this->hasOne(Amenity::class);
    }

    public function payment(): HasOne{
        return $this->hasOne(BookingPayment::class);
    }
}