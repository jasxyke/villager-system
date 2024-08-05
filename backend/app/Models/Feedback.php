<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    use HasFactory;

    protected $table='feedbacks';

    protected $fillable = [
        'resident_id',
        'message'
    ];

    public function resident(): BelongsTo{
        return $this->belongsTo(Resident::class);
    }
}