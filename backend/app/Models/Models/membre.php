<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class membre extends Model
{
    use HasFactory;
    protected $fillable = ['username', 'fullname', 'email', 'password'];

    public function member()
    {
        return $this->belongsTo(membre::class, 'membre_id');
    }
}
