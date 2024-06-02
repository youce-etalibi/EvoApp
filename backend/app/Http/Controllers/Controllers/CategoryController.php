<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Categorytype;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function create()
    {
        $category = new Category();
        $category->name = 'Shoes'; 
        $category->save();
        return $category;
    }
    public function getCategoriesTypes()
    {
        $categorys = Categorytype::all();
    return response()->json([
        'categorys' => $categorys,
    ], 200);
      
    }
}
