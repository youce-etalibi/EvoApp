<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoalsController;
use App\Http\Controllers\GenderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/prod', [ProductController::class, 'create']);
Route::get('/updating', [ProductController::class, 'updating']);

Route::get('/cat', [CategoryController::class, 'create']);
Route::get('/gender', [GenderController::class, 'create']);

Route::get('/createSizes', [ProductController::class, 'createSizes']);
Route::get('/createColor', [ProductController::class, 'createColor']);


Route::get('/insert-goal', [GoalsController::class, 'insertGoal']);
Route::get('/insert-activity', [ActivityController::class, 'insertActivity']);



// require _DIR_.'/auth.php';
