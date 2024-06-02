<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\favoriteExercice;

class FavoriteExerciceController extends Controller
{
    public function index(Request $request)
    {

        $id = $request->query('id');

        $favorites = favoriteExercice::where('user_id', $id)->get();
        return response()->json($favorites);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'exercice_id' => 'required|string',
        ]);

        $favorite = new favoriteExercice();
        $favorite->user_id  = $request->user_id;
        $favorite->exercice_id = $request->exercice_id;
        $favorite->save();

        return response()->json($favorite, 201);
    }

    public function destroy($user_id, $exerciseId)
    {
        $favorite = favoriteExercice::where('user_id', $user_id)
            ->where('exercice_id', $exerciseId)
            ->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json(null, 204);
        }

        return response()->json(['message' => 'Favorite not found'], 404);
    }
}
