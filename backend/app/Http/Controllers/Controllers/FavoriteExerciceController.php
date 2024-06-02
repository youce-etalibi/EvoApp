<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\favoriteExercice;

class FavoriteExerciceController extends Controller
{
    public function index($id)
    {
        $favorites = favoriteExercice::where('membre_id', $id)->get();
        return response()->json($favorites);
    }

    public function store(Request $request)
    {
        $request->validate([
            'membre_id' => 'required|integer',
            'exercice_id' => 'required|string',
        ]);

        $favorite = new favoriteExercice();
        $favorite->membre_id = $request->membre_id;
        $favorite->exercice_id = $request->exercice_id;
        $favorite->save();

        return response()->json($favorite, 201);
    }

    public function destroy($memberId, $exerciseId)
    {
        $favorite = favoriteExercice::where('membre_id', $memberId)
                                     ->where('exercice_id', $exerciseId)
                                     ->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json(null, 204);
        }

        return response()->json(['message' => 'Favorite not found'], 404);
    }
}
