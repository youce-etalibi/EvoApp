<?php

namespace App\Http\Controllers;

use App\Models\Gender;
use Illuminate\Http\Request;

class GenderController extends Controller
{
    public function create()
    {
        $gender = new Gender();
    
        $gender->name = 'Women'; 
    
        $gender->save();
    
        return $gender;
    }
}
