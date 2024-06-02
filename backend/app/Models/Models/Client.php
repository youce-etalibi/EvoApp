<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'phone',
        'city',
        'address',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}