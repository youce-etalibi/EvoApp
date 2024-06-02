<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;
    public function sellers()
    {
        return $this->hasMany(Seller::class);
    }

    public function planType()
    {
        return $this->belongsTo(PlanType::class);
    }

    
}
