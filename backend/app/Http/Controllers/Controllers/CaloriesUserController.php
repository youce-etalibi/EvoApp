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

    public function show($id)
    {
        return CaloriesUser::with('macrosConsumed')->findOrFail($id);
    }

        public function store(Request $request)
        {
            // Validate the request data
            $validatedData = $request->validate([
                'birthday' => 'required|date',
                'height' => 'required|numeric',
                'weight' => 'required|numeric',
                'goal' => 'required|string',
                'activity' => 'required|string',
            ]);

            $caloriesUser = CaloriesUser::create($validatedData);
        
        
            // Return a response
            return response()->json([
                'caloriesUser' => $caloriesUser,
            ], 201);
        }

        public function update(Request $request, $id)
        {
            // Uncomment the following lines to use authenticated user's ID
            // $user = Auth::user();
            // $id = $user->id;
    
            // Find the calories user by ID
            $caloriesUser = CaloriesUser::where('id',$id)->firstOrFail();
    
            // Validate the request data
            $validatedData = $request->validate([
                'height' => 'required|integer',
                'weight' => 'required|integer',
                'goal' => 'required|string',
                'activity' => 'required|string',
            ]);
           
            // Update only the specified fields
            $caloriesUser->update($validatedData);
    
            // Return a response
            return response()->json($caloriesUser);
        }

    public function destroy($id)
    {
        CaloriesUser::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
