<?php

namespace App\Http\Controllers;

use App\Models\MacrosConsumed;
use Illuminate\Http\Request;

class MacrosConsumedController extends Controller
{
    public function index()
    {
        return MacrosConsumed::all();
    }

    public function show($id)
    {
        return MacrosConsumed::where('calories_user_id', $id)->firstOrFail();
    }

    public function store(Request $request)
    {

        $macrosConsumed = MacrosConsumed::create($request->all());

        return response()->json($macrosConsumed, 201);
    }

    public function update(Request $request, $id)
    {

        $macrosConsumed = MacrosConsumed::findOrFail($id);

        $macrosConsumed->update($request->all());

        return response()->json($macrosConsumed);
    }

    public function destroy($id)
    {
        MacrosConsumed::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
