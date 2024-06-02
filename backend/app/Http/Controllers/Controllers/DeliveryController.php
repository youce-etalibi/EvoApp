<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    public function getdelivery(){
        $delivery = Delivery::all();
        return response()->json(['delivery' => $delivery]);
    }
}
