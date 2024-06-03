<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;
use App\Models\WorkoutExercice;
use App\Models\ExerciceWorkOutApi;
use Monolog\Level;

class WorkoutController extends Controller
{

    public function index(Request $request)
    {
        $id = $request->query('id');

        $workouts = Workout::whereHas('user', function ($query) use ($id) {
            $query->where('id', $id);
        })
            ->with(['level', 'workoutExercices.exerciceWorkOutApi'])
            ->get();

        return response()->json($workouts);
    }

    public function show($id)
    {
        $workout = Workout::with(['level', 'workoutExercices.exerciceWorkOutApi'])->find($id);
        if (!$workout) {
            return response()->json(['message' => 'Workout not found'], 404);
        }
        return response()->json($workout);
    }

    public function updateWorkoutDone($id, Request $request)
    {
        $workout = Workout::find($id);
        if (!$workout) {
            return response()->json(['message' => 'Workout not found'], 404);
        }
        $workout->done = $request->done;
        $workout->save();

        return response()->json($workout);
    }

    public function updateExerciseDone($id, Request $request)
    {
        $exercise = WorkoutExercice::find($id);
        if (!$exercise) {
            return response()->json(['message' => 'Workout exercise not found'], 404);
        }
        $exercise->done = $request->done;
        $exercise->save();

        $workout = $exercise->workout;
        $allDone = $workout->workoutExercices->every(function ($ex) {
            return $ex->done;
        });

        $workout->done = $allDone;
        $workout->save();

        return response()->json($exercise);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        // Create a new workout
        $workout = Workout::create([
            'name' => $data['name'],
            'level_id' => $data['level_id'],
            'user_id' => $data['user_id'],
            'alarm' => $data['alarm'],
            'date' => $data['date'],
            'time' => $data['time'],
            'message' => $data['message'] ?? null,
        ]);

        if ($data['exercises']) {
            foreach ($data['exercises'] as $exerciseData) {
                $exerciceWorkOutApi = ExerciceWorkOutApi::create([
                    'api_id' => $exerciseData['id']
                ]);

                WorkoutExercice::create([
                    'workout_id' => $workout->id,
                    'exercice_work_out_api_id' => $exerciceWorkOutApi->id,
                    'done' => $exerciseData['done'] ?? false,
                ]);
            }
        }

        // Return a success response
        return response()->json(['message' => 'Workout created successfully', 'workout' => $workout], 201);
    }

    public function addExercisesToWorkout(Request $request, $workoutId)
    {
        $workout = Workout::findOrFail($workoutId);

        $data = $request->all();

        if (isset($data['exercises']) && is_array($data['exercises'])) {
            foreach ($data['exercises'] as $exerciseData) {
                $exerciceWorkOutApi = ExerciceWorkOutApi::create([
                    'api_id' => $exerciseData['id']
                ]);

                WorkoutExercice::create([
                    'workout_id' => $workout->id,
                    'exercice_work_out_api_id' => $exerciceWorkOutApi->id,
                    'done' => $exerciseData['done'] ?? false,
                ]);
            }
        }

        // Return a success response
        return response()->json(['message' => 'Exercises added to workout successfully', 'workout' => $workout]);
    }


    public function update(Request $request, $id)
    {
        $workout = Workout::find($id);
        if (!$workout) {
            return response()->json(['message' => 'Workout not found'], 404);
        }

        // Update the workout with the new data
        $workout->update([
            'name' => $request->input('name'),
            'level_id' => $request->input('level_id'),
            'alarm' => $request->input('alarm'),
            'date' => $request->input('date'),
            'time' => $request->input('time'),
            'message' => $request->input('message')
        ]);

        return response()->json(['message' => 'Workout updated successfully', 'workout' => $workout]);
    }

    public function destroy($id)
    {
        $workout = Workout::find($id);
        if (!$workout) {
            return response()->json(['message' => 'Workout not found'], 404);
        }
        $workout->delete();

        return response()->json(['message' => 'Workout deleted successfully']);
    }



    public function getWorkoutExercises($id)
    {
        $workoutExercises = WorkoutExercice::where('workout_id', $id)
            ->with('exerciceWorkOutApi')
            ->get();

        if ($workoutExercises->isEmpty()) {
            return response()->json(['message' => 'No exercises found for the workout'], 404);
        }

        return response()->json($workoutExercises);
    }
}
