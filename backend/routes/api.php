<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\WishlistController;
use App\Models\Delivery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/getcollections', [ProductController::class, 'getProductsHome']);
Route::get('/getProductsShop', [ProductController::class, 'getProductsShop']);
Route::get('/getCategoriesTypes', [CategoryController::class, 'getCategoriesTypes']);
Route::post('/cart', [CartController::class, 'addToCart']);
Route::put('/updateCart', [CartController::class, 'updateCart']);
Route::get('/wishlistcount', [WishlistController::class, 'wishlistcount']);

Route::get('/getCartItem', [CartController::class, 'getCartItem']);


Route::get('/product-detail/{id}/', [ProductController::class, 'show']);
Route::delete('DeleteCart/{id}',[CartController::class,'DeleteCart']);
Route::delete('DeleteWishlist/{id}',[WishlistController::class,'DeleteWishlist']);

Route::post('/AddReview',[ReviewController::class,'AddReview']);

Route::post('/AddOrder',[OrderController::class,'AddOrder']);
Route::get('/getOrderrs',[OrderController::class,'getOrderrs']);

Route::get('/client',[ClientController::class,'clientdata']);
Route::put('/client',[ClientController::class,'update']);
Route::put('/seller',[SellerController::class,'update']);

Route::get('/getwishlist', [WishlistController::class, 'getwishlist']);
Route::post('/wishlist', [WishlistController::class, 'addtowishlist']);

route::post('/signin',[AuthController::class,'signin']);
route::post('/signup',[AuthController::class,'signup']);
route::post('/logout',[AuthController::class,'logout']);
Route::post('/google-signup', [AuthController::class, 'googleSignup']);
Route::post('/check-user', [AuthController::class, 'checkUser']);
Route::get('/getuser', [AuthController::class, 'getuser']);

route::post('/AddSeller',[SellerController::class,'AddSeller']);
route::post('/LoginSeller',[SellerController::class,'LoginSeller']);
route::post('/logoutseller',[SellerController::class,'logoutseller']);

Route::post('/selectedplan', [PlanController::class, 'selectedplan']);
Route::get('/getplans', [PlanController::class, 'getplans']);
Route::get('/getdelivery', [DeliveryController::class, 'getdelivery']);
Route::get('/getseller', [SellerController::class, 'getseller']);


Route::post('/products', [ProductController::class, 'createproducts']);
Route::get('/getproductseller', [ProductController::class, 'getproductseller']);
Route::get('/showformproduct', [ProductController::class, 'showformproduct']);
Route::get('/product/{id}', [ProductController::class, 'edit']);
Route::delete('/product/{id}', [ProductController::class, 'deleteprod']);
Route::put('/product/{id}', [ProductController::class, 'update']);

Route::put('/seller',[SellerController::class,'update']);
Route::get('/getProductImage/{imageName}', [ProductController::class, 'getProductImage']);
Route::put('/product', [ProductController::class, 'updateproduct']);

Route::get('/getproducts', [AdminController::class, 'getproducts']);
Route::get('/getproductsReviews', [AdminController::class, 'getproductsReviews']);
Route::delete('/product/{id}', [AdminController::class, 'deleteprod']);
Route::post('/addproducts', [AdminController::class, 'addproducts']);
Route::put('/product/{id}', [AdminController::class, 'updateProduct']);
Route::delete('/productreview/{id}', [AdminController::class, 'deleteproductreview']);
Route::get('/reviews', [ReviewController::class, 'getReviews']);


Route::get('/editcategory/{id}', [AdminController::class, 'editcategory']);
Route::put('/category/{id}', [AdminController::class, 'updatecategory']);
Route::post('/addcategory', [AdminController::class, 'addcategory']);
Route::delete('/category/{id}', [AdminController::class, 'deletecategory']);


Route::get('/gettypes', [AdminController::class, 'gettypes']);
Route::get('/showformtypes', [AdminController::class, 'showformtypes']);
Route::post('/addtype', [AdminController::class, 'addtype']);
Route::get('/edittype/{id}', [AdminController::class, 'edittype']);
Route::put('/type/{id}', [AdminController::class, 'updatetype']);
Route::delete('/type/{id}', [AdminController::class, 'deletetype']);

Route::get('/getclients', [AdminController::class, 'getclients']);
Route::get('/editclient/{id}', [AdminController::class, 'editclient']);
Route::put('/client/{id}', [AdminController::class, 'updateclient']);
Route::delete('/client/{id}', [AdminController::class, 'deleteclient']);

Route::get('/getOrderrsAdmin', [AdminController::class, 'getOrderrs']);
Route::delete('/deleteorder/{id}', [AdminController::class, 'deleteorder']);

Route::post('/toggle-publish', [ReviewController::class, 'togglePublish']);
Route::post('/toggle-publish', [SellerController::class, 'togglePublish']);
Route::post('/toggle-wishlist', [WishlistController::class, 'toggleWishlist']);

Route::get('/getSellers', [AdminController::class, 'getSellers']);
Route::delete('/deleteSeller/{id}', [AdminController::class, 'deleteSeller']);