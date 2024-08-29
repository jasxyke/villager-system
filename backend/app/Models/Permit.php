<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Permit extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'permit_type',
        'permit_status',
        'issue_date',
        'expiry_date',
        'application_date',
        // 'comments',
        'permit_request_id'
    ];

    public function resident(): BelongsTo{
        return $this->belongsTo(Resident::class);
    }

    public function permitDocuments(): HasMany{
        return $this->hasMany(PermitDocument::class);
    }

    public function permitRequest()
    {
        return $this->belongsTo(PermitRequest::class);
    }
}