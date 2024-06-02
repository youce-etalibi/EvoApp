<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Categorytype;
use App\Models\Color;
use App\Models\Gender;
use App\Models\Order;
use App\Models\Orderitem;
use App\Models\Plan;
use App\Models\Product;
use App\Models\Seller;
use App\Models\Size;
use App\Models\Type;
use App\Models\Wishlist;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use function PHPSTORM_META\type;

class ProductController extends Controller
{
    public function create()
    {
        $productsData = [
            [
                'title' => "Slim",
                'sub_description' => "High performance road slim ",
                'description' => "These custom road cap offer the best in comfort, performance, and style. Featuring a lightweight design and breathable materials, they are perfect for long rides and races.",
                'price' => 120,
                'stock' => 40
            ],

        ];
          $images = [
        'jersey1.png',
        'jersey2.png',
        'jersey3.png',
        'jersey4.png',
        'jersey5.png',
        'jersey6.png',
        'jersey7.png',
        'jersey8.png',
        'jersey9.png',
    ];

        for ($i = 0; $i < 24; $i++) {
            $productData = $productsData[array_rand($productsData)];
            $product = new Product();

            $product->title = $productData['title'];
            $product->sub_description = $productData['sub_description'];
            $product->description = $productData['description'];
            $product->price = $productData['price'];
            $product->image =$images[array_rand($images)];;
            $product->stock = $productData['stock'];
            $product->gender_id = 1;
            $product->category_id = 1;
            $product->type_id = 9;

            $product->save();
        }

        return response()->json(['message' => '50 products created successfully.']);
    }

    public function updating()
    {
        $products = Product::where('category_id', 1)->get();

        foreach ($products as $product) {
            $product->title = 'Shoes';
            $product->sub_description = 'High performance road Shoes ';
            $product->save();
        }
    }



public function getProductsHome()
{
    $productCount = Product::count();
    $genders = Gender::all();
    $productSizes = Size::all();
    $productColors = Color::all();
    $categories = Categorytype::with('category','type')->get();

    // Fetching products with colors, sizes, and a flag indicating whether they are in the wishlist
    $allProducts = Product::select('products.*', DB::raw('(CASE WHEN wishlists.product_id IS NOT NULL THEN true ELSE false END) as in_wishlist'))
                    ->leftJoin('wishlists', 'products.id', '=', 'wishlists.product_id')
                    ->with('color', 'size','category','type')
                    ->paginate(12);

    return response()->json([
        'products' => $allProducts,
        'genders' => $genders,
        'categories' => $categories,
        'productSizes' => $productSizes,
        'productCount' => $productCount,
        'productColors' => $productColors,
    ]);
}

public function getProductsShop()
{
    $productCount = Product::count();
    $genders = Gender::all();
    $productSizes = Size::all();
    $productColors = Color::all();
    $categories = Category::all();
    $types = Type::all();

    // Fetching products with colors, sizes, and a flag indicating whether they are in the wishlist


    $allProducts = Product::select('products.*', DB::raw('(CASE WHEN wishlists.product_id IS NOT NULL THEN true ELSE false END) as in_wishlist'))
    ->leftJoin('wishlists', 'products.id', '=', 'wishlists.product_id')
    ->leftJoin('sellers', 'products.seller_id', '=', 'sellers.id')
    ->with('color', 'size','category','type')
    ->where(function ($query) {
        // Products with sellers and show_publish is true
        $query->whereNotNull('products.seller_id')->where('sellers.show_publish', true);
    })
    ->orWhere(function ($query) {
        // Products without sellers
        $query->whereNull('products.seller_id');
    })
    ->paginate($productCount);


    return response()->json([
        'products' => $allProducts,
        'genders' => $genders,
        'categories' => $categories,
        'productSizes' => $productSizes,
        'productCount' => $productCount,
        'types' => $types,
        'productColors' => $productColors,
    ]);
}



public function show($id) {
    $productsizes = Size::all();
    $productcolors = Color::all();
    $product = Product::with('category','type')->find($id);

    if (!$product) {
        return response()->json(['error' => 'Product not found'], 404);
    }

    $category = Category::find($product->category_id);
    $allProducts = Product::all();
    $count = $allProducts->count();
    $relatedProducts = Product::where('category_id', $category->id)
    ->where('id', '!=', $id)
    ->with('type','category')
    ->paginate($count);

    // Check if the product is in the wishlist table
    $isInWishlist = Wishlist::where('product_id', $id)
    ->exists();


    return response()->json([
        'product' => $product,
        'allProducts' => $allProducts,
        'related_products' => $relatedProducts,
        'productcolors' => $productcolors,
        'productsizes' => $productsizes,
        'inwishlist' => $isInWishlist, // Include whether the product is in the wishlist
        'reviews' => $product->reviews, // Include the reviews
    ]);
}


public function showformproduct(){

    $categories = Category::all();
    $genders = Gender::all();
    $types = type::all();

    return response()->json(
        [
            'categories' => $categories,
            'genders' => $genders,
            'types' => $types,
            ]

    );
}
public function createproducts(Request $request){
    $requestData = $request->all();
    $sellerid = $request->seller_id;


    $seller = Seller::find($sellerid);

    if (!$seller) {
        return response()->json(['error' => 'Seller not found.'], 404);
    }

    if ($request->hasFile('image')) {
        $profileImage = $request->file('image');
        $imageName = date('His') . '.' . $profileImage->getClientOriginalExtension();

        $profileImage->move(public_path('storage/store/collections'), $imageName);

        $requestData['image'] = $imageName;
    }


    if ($seller->plan_id === 1) {
        $productsellercount= Product::where('seller_id', $sellerid)
                        ->count();

                        if ($seller->plan_id == 1) {
                            $planStartDate = $seller->plan_start_date;
                            if ($planStartDate) {
                                // Convert $planStartDate to a DateTime object
                                $planStartDate = new DateTime($planStartDate);
                                $oneMonthAgo = new DateTime();
                                $oneMonthAgo->modify('-1 month');

                                if ($planStartDate < $oneMonthAgo) {
                                    return response()->json(['error' => 'You have reached the maximum product limit for your plan. Please upgrade your plan to add more products.'], 403);
                                }
                            }
                        }

        if ($productsellercount >= 20) {
            return response()->json(['error' => 'You have reached the maximum product limit for your plan. Please upgrade your plan to add more products.'], 403);
        }
    }

    // Proceed with creating the product
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



public function getproductseller(Request $request){
    $sellerid = $request->query('id');
    $seller = Seller::find($sellerid);


    if (!$sellerid) {
        return response()->json(['error' => 'User ID is required'], 400);
    }

    $productseller = Product::where('seller_id', $sellerid)

                        ->with(['category', 'type'])
                        ->get();

    $product_sale = Product::where('seller_id', $sellerid)
                        ->where('is_sale', true)
                        ->with(['category', 'type','gender'])
                        ->get();

    $total_count = $productseller->count();
    $sale_count = $product_sale->count();

    $sale_percentage = $total_count > 0 ? ($sale_count / $total_count) * 100 : 0;

    $prod = Orderitem::all();

$saleProductIds = $product_sale->pluck('id')->toArray();
$matchedItems = $prod->filter(function ($item) use ($saleProductIds) {
    return in_array($item->product_id, $saleProductIds);
});

$productEarnings = $matchedItems->map(function ($item) {
    return $item->quantity * $item->product->price;
});

// Sum up the earnings
$totalEarnings = $productEarnings->sum();


    $matchedItems = [];
    $productIds = $prod->pluck('product_id')->toArray();

    foreach ($productIds as $productId) {
        if (in_array($productId, $saleProductIds)) {
            $matchedItem = $prod->firstWhere('product_id', $productId);

            if ($matchedItem) {
                $matchedItems[] = $matchedItem;
            }
        }
    }


    $matchedItemsCount = collect($matchedItems)->groupBy('product_id')->map(function ($items) {
        $product = $items->first()->product;
        $totalQuantity = $items->sum('quantity');
        $totalEarnings = $totalQuantity * $product->price;
        return [
            'product' => $product,
            'count' => $items->count(),
            'total_quantity' => $totalQuantity,
            'total_earnings' => $totalEarnings,
        ];
    })->values();



    $sortedMatchedItems = $matchedItemsCount->sortByDesc('count')->values();
    $totalEarningsSum = $matchedItemsCount->sum('total_earnings');

    $plan = Plan::where('plan_type_id', 2)->first();
    if ($seller->plan_id == 2) {
        $planStartDate = $seller->plan_start_date;
        if ($planStartDate) {
            $planStartDate = new DateTime($planStartDate);
            $oneMonthAgo = new DateTime();
            $oneMonthAgo->modify('-1 month');

            if ($planStartDate < $oneMonthAgo) {
                $totalEarnings -= $plan->price;
            }
        }
    }

    if ($seller->plan_id == 1) {
        $planStartDate = $seller->plan_start_date;
        if ($planStartDate) {
            $planStartDate = new DateTime($planStartDate);
            $oneMonthAgo = new DateTime();
            $oneMonthAgo->modify('-1 month');

            if ($planStartDate < $oneMonthAgo) {
                return response()->json(['error' => 'You have reached the maximum product limit for your plan. Please upgrade your plan to add more products.'], 403);
            }
        }
    }

    return response()->json([
        'productseller' => $productseller,
        'product_sale' => $product_sale,
        'sale_percentage' => $sale_percentage,
        'matchedItems' => $matchedItems,
        'sortedMatchedItems' => $sortedMatchedItems,
        'totalEarningsSum' => $totalEarningsSum,
    ], 201);
}


public function getProductImage($imageName)
    {
        $imagePath = public_path('store/collections' . $imageName);

        if (file_exists($imagePath)) {
            return response()->file($imagePath);
        }else {
            return response()->json(['message' => 'file not existe']);
        }
    }


public function edit($id) {
    $product = Product::find($id);

    if(!$product){
        return response()->json(['error' => 'product ID is required'], 400);

    }
    return response()->json(['product' => $product], 200);
}


public function update(Request $request)
{
    $product = Product::findOrFail($request->id);

    $product->update(
    [ $product->title = $request->title,
     $product->sub_description = $request->sub_description,
     $product->description = $request->description,
     $product->price = $request->price,
     $product->image = $request->image,
     $product->stock = $request->stock,
     $product->category_id = $request->category_id,
     $product->gender_id = $request->gender_id,
     $product->type_id = $request->type_id,
     ]
 );

    return response()->json(['product' => $product], 200);
}

public function deleteprod($id){
    $product = Product::findOrFail($id);
    if($product){
        $product->delete();
    }
    return response()->json(["message" =>'product deleted avec success'], 200);

}

}
