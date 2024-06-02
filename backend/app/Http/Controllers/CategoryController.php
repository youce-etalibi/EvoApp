<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Categorytype;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function create()
    {
        $category = new Category();
        $category->name = 'Clothes';
        $category->save();
        return $category;
    }

    public function getCategoriesTypes()
    {
        // Fetch all categories and their associated types, if any
        $categoriesWithTypes = DB::table('categories')
            ->leftJoin('categorytypes', 'categories.id', '=', 'categorytypes.category_id')
            ->leftJoin('types', 'categorytypes.type_id', '=', 'types.id')
            ->select('categories.id as category_id', 'categories.name as category_name', 'types.id as type_id', 'types.name as type_name')
            ->get();

        // Initialize an empty array to structure the data
        $categories = [];

        // Organize the data
        foreach ($categoriesWithTypes as $item) {
            $categoryId = $item->category_id;

            // Check if the category already exists in the $categories array
            if (!isset($categories[$categoryId])) {
                $categories[$categoryId] = [
                    'id' => $categoryId,
                    'name' => $item->category_name,
                    'types' => [],
                ];
            }

            // Check if the type exists (not null)
            if (!is_null($item->type_id)) {
                $categories[$categoryId]['types'][] = [
                    'id' => $item->type_id,
                    'name' => $item->type_name,
                ];
            }
        }

        // Reset keys to ensure JSON response is an array of categories
        $categories = array_values($categories);

        return response()->json([
            'categorys' => $categories,
        ], 200);
    }


}
