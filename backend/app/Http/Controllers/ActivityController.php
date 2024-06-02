<?php

namespace App\Http\Controllers;

use App\Models\activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function insertActivity()
    {
        $activities = [
            ['name' => 'Sedentary'],
            ['name' => 'Lightly active '],
            ['name' => 'Moderately active'],
            ['name' => 'Very active']
        ];

        activity::insert($activities);

        // Return a response if needed
        return response()->json(['message' => 'Activities inserted successfully'], 201);
    }
}
