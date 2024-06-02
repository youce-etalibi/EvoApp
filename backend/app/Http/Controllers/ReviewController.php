<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
   public function AddReview(Request $request){
    $product_id = $request->product_id;
    $User_id = $request->user_id;
    $username = $request->username;
    $email = $request->email;
    $message = $request->message;
    $rating = $request->rating;

    $review = new Review();
    $review->user_id = $User_id;
    $review->username = $username;
    $review->email = $email;
    $review->message = $message;
    $review->rating = $rating;
    $review->product_id = $product_id;
    $review->save();

    return response()->json(['message' => 'review added successfully'], 200);

   }

   public function togglePublish(Request $request)
{
    $review = Review::find($request->id);

    if ($review) {
        $review->show_publish = !$review->show_publish;
        $review->save();

        return response()->json(['success' => true, 'show_publish' => $review->show_publish]);
    }

    return response()->json(['success' => false], 404);
   }
   
   
   
   public function getReviews()
   {
      $reviews = Review::where('show_publish',true)->get();
      return response()->json(['reviews' => $reviews], 201);
    

}
}
