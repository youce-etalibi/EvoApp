<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WorkoutExercice extends Model
{
    use HasFactory;

    protected $fillable = [
        'workout_id', 'exercice_work_out_api_id', 'repetition', 'duration', 'done',
    ];
    public function workout()
    {
        return $this->belongsTo(workout::class);
    }

    public function exerciceWorkOutApi()
    {
        return $this->belongsTo(exerciceWorkOutApi::class);
    }
}
