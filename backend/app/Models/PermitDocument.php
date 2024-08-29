<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermitDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'permit_request_id',
        'description',
        'document_path',
        'document_url',
        'upload_date',
    ];

    public function permitRequest()
    {
        return $this->belongsTo(PermitRequest::class, 'permit_request_id');
    }
}
