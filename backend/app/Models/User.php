<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Mail\PasswordResetNotification;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, CanResetPassword;

    // public function sendPasswordResetNotification($token)
    // {
    //     Mail::to($this->email, $this->firstname . ' ' . $this->lastname)
    //         ->send(new PasswordResetNotification(
    //             $this->firstname . ' ' . $this->lastname,
    //             url(env('WEB_APP_URL').'/reset-password'.'?token='.$token . '&email=' . $this->email)));
    // }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'lastname',
        'firstname',
        'middlename',
        'role_type',//'resident','tenant','admin','treasurer','home_owner'
        'email',
        'password',
        'remember_token',
        'contact_number',
        'picture_url',
        'picture_path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];

    public function resident(): HasOne{
        return $this->hasOne(Resident::class);
    }

    public function admin(): HasOne{
        return $this->hasOne(Admin::class);
    }

    public function notifications(): HasMany{
        return $this->hasMany(Notification::class);
    }

     // Relationship to Permits
     public function permits()
     {
         return $this->hasMany(Permit::class);
     }
 
     // Relationship to PermitRequests
     public function permitRequests()
     {
         return $this->hasMany(PermitRequest::class);
     }

     public function carStickerRequests()
    {
        return $this->hasMany(CarStickerRequest::class);
    }

    public function expoUserTokens()
    {
        return $this->hasMany(ExpoUserToken::class);
    }

    public function householdPermissions()
    {
        return $this->hasMany(HouseholdPermission::class);
    }


}