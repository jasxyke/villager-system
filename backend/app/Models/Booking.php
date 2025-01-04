<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        // 'user_id',
        'amenity_id',
        'resident_id',
        'booking_date',
        'start_time',
        'end_time',
        //new fields
        'is_guest',
        'num_of_resident',
        'num_of_guest',
        'full_name',
        'email',
        'contact_number',
        'booking_status',
        'booking_type',
        'booking_status'
    ];

    public function resident(): BelongsTo{
        return $this->belongsTo(Resident::class);
    }

    public function amenity(): BelongsTo{
        return $this->belongsTo(Amenity::class);
    }

    public function bookingPayments(): HasMany{
        return $this->hasMany(BookingPayment::class);
    }
}