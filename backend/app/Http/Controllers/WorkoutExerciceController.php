<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkoutExercice;
use App\Models\WorkoutExercise;

class WorkoutExerciseController extends Controller
{
    public function store(Request $request)
    {
        $workoutExercise = WorkoutExercice::create($request->all());
        return response()->json($workoutExercise, 201);
    }

    public function destroy($workoutId, $exerciseId)
    {
        WorkoutExercice::where('workout_id', $workoutId)
                        ->where('exercice_work_out_api_id', $exerciseId)
                        ->delete();
        return response()->json(null, 204);
    }
}
