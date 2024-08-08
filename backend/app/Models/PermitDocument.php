<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PermitDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'permit_id',
        'document_type',
        'document_path',
        'document_url',
        'upload_date'
    ];

    public function permit(): BelongsTo{
        return $this->belongsTo(Permit::class);
    }
}