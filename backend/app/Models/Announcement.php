<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'title',
        'content',
        'picture_path',
        'picture_url',
        'event_start_date',
        'event_end_date',
        'event_start_time',
        'event_end_time'
        // 'type'
    ];

    public function admin(): BelongsTo{
        return $this->belongsTo(Admin::class);
    }
}