<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['client_id', 'total_amount', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function delivery()
    {
        return $this->belongsTo(Delivery::class);
    }

    public function items()
    {
        return $this->hasMany(Orderitem::class);
    }
}