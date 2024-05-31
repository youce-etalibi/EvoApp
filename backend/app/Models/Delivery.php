<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    protected $fillable = ['price', 'date_from', 'date_to', 'seller_id'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

   

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
}
