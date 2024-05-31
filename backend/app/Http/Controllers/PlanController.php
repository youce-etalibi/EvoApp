<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\Seller;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function selectedplan(Request $request){

        $seller = Seller::find($request->id);
        if($seller){

            $seller->plan_id = $request->plan_id;
            $seller->plan_start_date = $request->plan_start_date;
            $seller->save();
        }
        return response()->json(['message' => 'your plan was accepted']);

    }

    public function getplans(){
        $plans = Plan::with('planType')->get();
        return response()->json(['plans' => $plans]);
    }
}
