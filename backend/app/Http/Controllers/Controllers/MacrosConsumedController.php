<?php

namespace App\Http\Controllers;

use App\Models\MacrosConsumed;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Auth;

class MacrosConsumedController extends Controller
{
    // Past version without authentication
    public function update(Request $request, $calories_user_id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'proteins_consumed' => 'required|integer',
            'fats_consumed' => 'required|integer',
            'carbs_consumed' => 'required|integer',
            'calories_consumed' => 'required|integer',
        ]);

        // Find the MacrosConsumed instance by calories_user_id
        $macrosConsumed = MacrosConsumed::where('calories_user_id', $calories_user_id)->firstOrFail();

        // Update the fields
        $macrosConsumed->update($validatedData);

        // Return a response
        return response()->json($macrosConsumed);
    }

    // Updated version with authentication
    // public function update(Request $request)
    // {
    //     // Get the authenticated user
    //     $user = Auth::user();

    //     // Validate the request data
    //     $validatedData = $request->validate([
    //         'proteins_consumed' => 'required|integer',
    //         'fats_consumed' => 'required|integer',
    //         'carbs_consumed' => 'required|integer',
    //         'calories_consumed' => 'required|integer',
    //     ]);

    //     // Find the MacrosConsumed instance by user's ID
    //     $macrosConsumed = MacrosConsumed::where('calories_user_id', $user->id)->firstOrFail();

    //     // Update the fields
    //     $macrosConsumed->update($validatedData);

    //     // Return a response
    //     return response()->json($macrosConsumed);
    // }
}
