<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class workout extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'level_id', 'membre_id', 'alarm', 'date', 'time', 'message', 'done',
    ];

    public function level()
    {
        return $this->belongsTo(level::class);
    }

    public function workoutExercices()
    {
        return $this->hasMany(WorkoutExercice::class);
    }

    public function membre()
    {
        return $this->belongsTo(membre::class);
    }
}
