<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    public function resident(): HasOne{
        return $this->hasOne(Resident::class);
    } 
}