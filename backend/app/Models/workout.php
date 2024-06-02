<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class workout extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'level_id', 'user_id', 'alarm', 'date', 'time', 'message', 'done',
    ];

    public function level()
    {
        return $this->belongsTo(level::class);
    }

    public function workoutExercices()
    {
        return $this->hasMany(WorkoutExercice::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
