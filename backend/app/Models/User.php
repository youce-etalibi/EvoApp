<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    protected $fillable = [
        'name',
        'lastName',
        'firstName',
        'profile',
        'gendre',
        'email',
        'password',
    ];
    use HasApiTokens, HasFactory, Notifiable;

    public function reviews()
{
    return $this->hasMany(Review::class);
}

public function client()
{
    return $this->hasOne(Client::class);
}

public function seller()
{
    return $this->hasOne(Seller::class);
}


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
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
