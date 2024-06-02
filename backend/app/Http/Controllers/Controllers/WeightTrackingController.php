<?php

namespace App\Http\Controllers;

use App\Models\goal;
use App\Models\membre;
use App\Models\userInfo;
use Illuminate\Http\Request;
use App\Models\WeightTracking;

class WeightTrackingController extends Controller
{
    public function index($id)
    {
        $weightTracking = WeightTracking::where('membre_id', $id)->get();
        $userInfo = userInfo::find($id);
        $goalId = $userInfo->goal_id;
        $goal = goal::find($goalId);

        return response()->json([
            'weightTracking' => $weightTracking,
            'user_info' => $userInfo,
            'goal' => $goal,
        ]);
    }

    public function store(Request $request)
    {
        $membre_id = $request->input('membre_id');
        $weight = $request->input('weight');
        $date = $request->input('date');
        $time = $request->input('time');

        if (!$membre_id || !$weight || !$date || !$time) {
            return response()->json(['error' => 'All fields are required.'], 400);
        }

        if (!is_numeric($weight)) {
            return response()->json(['error' => 'Weight must be a numeric value.'], 400);
        }

        if (!membre::find($membre_id)) {
            return response()->json(['error' => 'Member does not exist.'], 404);
        }

        WeightTracking::where('membre_id', $membre_id)
                      ->where('date', $date)
                      ->delete();

        $weightTracking = WeightTracking::create([
            'membre_id' => $membre_id,
            'weight' => $weight,
            'date' => $date,
            'time' => $time,
        ]);

        return response()->json($weightTracking, 201);
    }
}
