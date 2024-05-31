<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorytype extends Model
{
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function Type()
    {
        return $this->belongsTo(Type::class);
    }

}
