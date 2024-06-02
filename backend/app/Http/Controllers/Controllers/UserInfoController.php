<?php

namespace App\Http\Controllers;

use App\Models\userInfo;
use Illuminate\Http\Request;

class UserInfoController extends Controller
{
    public function index($id)
    {
       $user = userInfo::where('membre_id', $id)->get();
       return response()->json($user);
    }
}
