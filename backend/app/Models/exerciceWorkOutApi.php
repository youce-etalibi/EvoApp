<?php

namespace App\Models;

use App\Models\WorkoutExercice;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class exerciceWorkOutApi extends Model
{
    use HasFactory;

    protected $fillable = [
        'api_id',
    ];

    public function workoutExercices()
    {
        return $this->hasMany(WorkoutExercice::class);
    }
}
