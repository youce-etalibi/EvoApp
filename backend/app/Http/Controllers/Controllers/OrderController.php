<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Client;
use App\Models\Delivery;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Orderr;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
   public function getOrderrs(Request $request){
    $userId = $request->query('id');
    $clientData = Client::where('user_id', $userId)->first();

    $orderss = Order::where('client_id', $clientData->id)->with('items.product.type','delivery')->get();
    $orderssCount = $orderss->count();
   
     return response()->json([
        'orderssCount' => $orderssCount,
        'orderss' => $orderss,
        'clientId' => $userId,
    ]);
   }
  
   
   public function AddOrder(Request $request)
   {
       $firstname = $request->firstname;
       $lastname = $request->lastname;
       $email = $request->email;
       $phone = $request->phone;
       $city = $request->city;
       $address = $request->address; 
       $userId = $request->user_id; 
       $delivery_id = $request->delivery_id; 
       $totalAmount = $request->total; 
   
       $orderItems = $request->orderItems;
   
       if (count($orderItems) === 0) {
           return response()->json(['message' => 'No order items provided'], 400);
       }
   
       $client = Client::where('user_id', $userId)->first();
       $clientEmail = Client::where('email', $email)->first();
   
       if ($clientEmail) {
           return response()->json(['error' => 'Enter another email please'], 400);
       }
       if (!$userId) {
           return response()->json(['error' => 'User ID is required'], 400);
       }
   
       if (!$client) {
           $client = new Client();
           $client->firstname = $firstname;
           $client->lastname = $lastname;
           $client->email = $email;
           $client->phone = $phone;
           $client->city = $city;
           $client->address = $address;
           $client->user_id = $userId;
           $client->save();
       }
   
       // Create a new order
       $order = new Order();
       $order->client_id = $client->id;
       $order->total_amount = $totalAmount;
       $order->status = 'Pending';
       $order->delivery_id = $delivery_id;
       $order->save();
   
       // Add order items and update the product's is_sale field
       foreach ($orderItems as $item) {
           $orderItem = new OrderItem();
           $orderItem->order_id = $order->id; 
           $orderItem->product_id = $item['productId'];
           $orderItem->quantity = $item['quantity'];
           $orderItem->price = $item['price'];
           $orderItem->save();
   
           // Update the product's is_sale field
           $product = Product::find($item['productId']);
           if ($product) {
               $product->is_sale = true;
               $product->stock -= $item['quantity'];
               $product->save();
    
           }

       }
   
       return response()->json(['message' => 'Order added successfully'], 200);
   }
   


}
