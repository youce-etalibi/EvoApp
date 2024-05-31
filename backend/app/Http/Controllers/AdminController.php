<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Categorytype;
use App\Models\Client;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use App\Models\Type;
use FontLib\Table\Type\name;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getproducts(){
        $products = Product::with('category','type','gender')->paginate();
       
        return response()->json([ 
            'products' => $products,
        ], 200);
    }
    
    public function getproductsReviews(){
        $productsreview = Review::with('product','user')->get();
       
        return response()->json([ 
            'productsreview' => $productsreview,
        ], 200);
    }
    
    
    public function addproducts(Request $request){
        $requestData = $request->all();
    
        if ($request->hasFile('image')) {
            $profileImage = $request->file('image');
            $imageName = date('His') . '.' . $profileImage->getClientOriginalExtension();
    
            $profileImage->move(public_path('storage/store/collections'), $imageName);
    
            $requestData['image'] = $imageName;
        }
    
        $product = Product::create($requestData);
    
        return response()->json(['product' => $product], 201);
    }

    
public function updateProduct(Request $request){
    $requestData = $request->all();
    $prod = Product::findOrFail($requestData['id']); 
    if ($request->hasFile('image')) {
        $profileImage = $request->file('image');
        $imageName = date('His') . '.' . $profileImage->getClientOriginalExtension();

        $profileImage->move(public_path('storage/store/collections'), $imageName);

        $requestData['image'] = $imageName;
    }
    $prod->update($requestData);

    return response()->json(['success' => 'Product updated successfully.']);
}
    
    
public function deleteprod($id){
    $product = Product::findOrFail($id); 
    if($product){
        $product->delete();
    }
    return response()->json(["message" =>'product deleted avec success'], 200);
    
}
public function deleteproductreview($id){
    $productreview = Review::findOrFail($id); 
    if($productreview){
        $productreview->delete();
    }
    return response()->json(["message" =>'productreview deleted avec success'], 200);
    
}


    
public function addcategory(Request $request){
    Category::create(['name' => $request->name]);

    return response()->json(201);
}

public function editcategory($id){
    $category = Category::find($id);
   
    return response()->json([ 
        'category' => $category,
    ], 200);
}


    
public function updatecategory(Request $request){
    $requestData = $request->all();
    $prod = Category::findOrFail($requestData['id']); 
    $prod->update($requestData);
    return response()->json(['success' => 'category updated successfully.']);
}


public function deletecategory($id){
    $category = Category::findOrFail($id); 
    if($category){
        $category->delete();
    }
    return response()->json(["message" =>'category deleted avec success'], 200);
    
}


public function gettypes(){
    $types = Type::all();
   
    return response()->json([ 
        'types' => $types,
    ], 200);
}

   
    
public function addtype(Request $request){
    $idcat = $request->cat_id;
    $nametype = $request->name;

    $type = Type::create(['name' => $nametype]);

    $categoryType = Categorytype::create([
        'category_id' => $idcat,
        'type_id' => $type->id
    ]);

    return response()->json(['categoryType' => $categoryType], 201);
}


public function showformtypes(){
    $category = Category::all();
   
    return response()->json([ 
        'categorys' => $category,
    ], 200);
}


public function edittype($id){

    $type = Type::find($id);
    $categorys = Category::all();
    $categorytype = Categorytype::with('type','category')->where('type_id',$type->id)->first();
    $category = Category::where("id",$categorytype->category_id)->first();
    
     return response()->json([ 
        'type' => $type,
        'category' => $category,
        'categorys' => $categorys,
        'categorytype' => $categorytype,
    ], 200);

}

public function updatetype(Request $request){
    $catId = $request->cat_id;
    $typeName = $request->name;

    $type = Type::find($request->id);

    if ($type) {
        
            $type->name = $typeName;
            $type->save();
            
            $categoryType = Categorytype::where('type_id', $type->id)->first();
            
            if ($categoryType) {
                $categoryType->category_id = $catId;
                $categoryType->save();
            } 
            
        }
    return response()->json(['success' => 'Type updated successfully.']);
}

public function deletetype($id){
    $type = Type::findOrFail($id); 
    if($type){
        $type->delete();
    }
    return response()->json(["message" =>'type deleted avec success'], 200);
    
}


public function getclients(){
    $clients = Client::with('orders')->withCount('orders')->get();
   
    return response()->json([ 
        'clients' => $clients,
    ], 200); 
 
}

public function editclient($id){

    $client = Client::find($id);
    
     return response()->json([ 
        'client' => $client,
    ], 200);

}

public function updateclient(Request $request){
   $requestData = $request->all();
       $client = Client::find($requestData['id']);
    $client->update($requestData);
      
    return response()->json(['success' => ' client updated successfully.']);
}

public function deleteclient($id){
    $client = Client::findOrFail($id); 
    if($client){
        $client->delete();
    }
    return response()->json(["message" =>'client deleted avec success'], 200);
    
}

}
