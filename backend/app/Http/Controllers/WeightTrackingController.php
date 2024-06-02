<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\goals;
use App\Models\membre;
use App\Models\CaloriesUser;
use Illuminate\Http\Request;
use App\Models\WeightTracking;

class WeightTrackingController extends Controller
{
    public function index(Request $request)
    {
        $id = $request->query('id');

        $weightTracking = WeightTracking::where('user_id', $id)->get();
        $user = User::where('id', $id)->first();
        $userInfo = CaloriesUser::where('user_id', $id)->first();

        if ($userInfo) {
            $goal = goals::find($userInfo->goal_id);

            return response()->json([
                'weightTracking' => $weightTracking,
                'user' => $user,
                'user_info' => $userInfo,
                'goal' => $goal,
            ]);
        } else {
            return response()->json(['error' => 'User information not found'], 404);
        }
    }


    public function store(Request $request, $id)
    {

        $weight = $request->input('weight');
        $date = $request->input('date');
        $time = $request->input('time');

        if (!$weight || !$date || !$time) {
            return response()->json(['error' => 'All fields are required.'], 400);
        }

        if (!is_numeric($weight)) {
            return response()->json(['error' => 'Weight must be a numeric value.'], 400);
        }

        if (!User::find($id)) {
            return response()->json(['error' => 'Member does not exist.'], 404);
        }

        WeightTracking::where('user_id', $id)
            ->where('date', $date)
            ->delete();

        $weightTracking = WeightTracking::create([
            'user_id' => $id,
            'weight' => $weight,
            'date' => $date,
            'time' => $time,
        ]);

        return response()->json($weightTracking, 201);
    }
}
