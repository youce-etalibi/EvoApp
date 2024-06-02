<?php

namespace App\Models;

use App\Models\workout;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class level extends Model
{
    use HasFactory;
    protected $fillable = ['label'];

    public function workouts()
    {
        return $this->hasMany(workout::class);
    }
}
