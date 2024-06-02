<?php

namespace App\Http\Controllers;

use App\Models\CaloriesUser;
use App\Models\MacrosConsumed;
use Illuminate\Http\Request;

class CaloriesUserController extends Controller
{
    public function index()
    {
        return CaloriesUser::with('macrosConsumed')->get();
    }

    public function show(Request $request)
    {

        $userId = $request->query('id');

        if (!$userId) {
            return response()->json(['error' => 'User ID is required'], 400);
        }

        $caloriesUser = CaloriesUser::with('macrosConsumed')->where('user_id', $userId)->first();

        if (!$caloriesUser) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json($caloriesUser);
    }


    public function store(Request $request)
    {

        $caloriesUser = CaloriesUser::create($request->all());

        return response()->json([
            'caloriesUser' => $caloriesUser,
        ], 201);
    }

    public function update(Request $request, $user_id)
    {
        // Find the user by user_id
        $caloriesUser = CaloriesUser::where('user_id', $user_id)->first();

        // Check if the user exists
        if (!$caloriesUser) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Update the user's calories data with the request data
        $caloriesUser->update($request->all());

        // Return the updated user data as JSON response
        return response()->json($caloriesUser);
    }



    public function destroy(Request $request)
    {
        $userId = $request->query('id');

        $caloriesUser = CaloriesUser::where('user_id', $userId)->firstOrFail();
        $caloriesUser->delete();
        return response()->json(null, 204);
    }
}
