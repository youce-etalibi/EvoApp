<?php

namespace App\Http\Controllers;

use App\Models\goals;
use Illuminate\Http\Request;
use App\Models\Goal; // Assuming the model is named Goal

class GoalsController extends Controller
{
    public function insertGoal()
    {
        $goals = [
            ['name' => 'Losing weight'],
            ['name' => 'Maintaining weight'],
            ['name' => 'Gaining weight'],
            ['name' => 'Build muscle']
        ];

        goals::insert($goals);

        // Return a response if needed
        return response()->json(['message' => 'Goals inserted successfully'], 201);
    }
}
