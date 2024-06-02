<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    
    public function clientdata(Request $request){

        $userId = $request->query('id');

        if (!$userId) {
            return response()->json(['error' => 'User ID is required'], 400);
        }

        $clientdata = Client::where('user_id',$userId)->first();
       
         return response()->json([
            'clientdata' => $clientdata,
        ]);
       }

       public function update(Request $request)
       {
           $client = Client::findOrFail($request->id); 
   
           $client->update(
           [ $client->firstname = $request->firstname,
            $client->lastname = $request->lastname,
            $client->email = $request->email,
            $client->phone = $request->phone,
            $client->city = $request->city,
            $client->address = $request->address,
            $client->user_id = $request->user_id,
            ]
        );
   
           return response()->json(['clientdata' => $client], 200);
       }
}
