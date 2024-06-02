<?php

namespace App\Http\Controllers;

use App\Models\Seller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SellerController extends Controller
{

    public function AddSeller(Request $request){

        $name = $request->input('name');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $userid = $request->input('usr_id');


        $seller = Seller::where('usr_id', $userid)->first();
        $selleremail = Seller::where('emailseller', $email)->first();

    if ($selleremail) {
        return response()->json(['error' => 'Enter another email please'], 400);
    }
    if (!$userid) {
        return response()->json(['error' => 'User ID is required'], 400);
    }
    if ($seller) {
        return response()->json(['error' => 'User ID already has a registered seller account'], 400);
    }
        $seller = new Seller();
        $seller->nameseller = $name;
        $seller->emailseller = $email;
        $seller->phoneseller =$phone;
        $seller->usr_id =$userid;
        $seller->save();


        $token = Str::random(60);
        $seller->api_token = hash('sha256', $token);
        $seller->save();

        return response()->json(['message' => 'seller registered successfully',"seller_id" => $seller->id, 'seller' => $seller,'token'=>$token], 201);

    }


    public function LoginSeller(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'emailseller' => 'required|email',
            'nameseller' => 'required|string'
        ]);

        // Retrieve the seller based on the given credentials
        $seller = Seller::where('emailseller', $validatedData['emailseller'])
                        ->where('nameseller', $validatedData['nameseller'])
                        ->first();

        // Check if the seller exists
        if ($seller) {
            $token = Str::random(60);
            $seller->api_token = hash('sha256', $token);
            return response()->json([
                'status' => 200,
                'valid' => true,
                'seller' => $seller,
                'token' => $token,
                'seller_id' => $seller->id,
            ], 200);
        } else {
            return response()->json([
                'status' => 401,
                'valid' => false,
                'message' => 'Seller not found',
            ], 401);
        }
    }

public function getseller(Request $request)
{
    $sellerId = $request->query('id');

    if (!$sellerId) {
        return response()->json(['error' => 'seller ID is required'], 400);
    }
    $seller = Seller::find($sellerId);
    if (!$seller) {
        return response()->json(['error' => 'seller not found'], 404);
    }
    return response()->json(['seller' => $seller], 200);
}
public function update(Request $request)
{
    $seller = Seller::find($request->id);

    if (!$seller) {
        return response()->json(['error' => 'Seller not found'], 404);
    }

    $seller->update([
        'nameseller' => $request->input('nameseller'),
        'emailseller' => $request->input('emailseller'),
        'phoneseller' => $request->input('phoneseller'),
    ]);

    return response()->json(['seller' => $seller], 200);
}



public function togglePublish(Request $request)
{
    $seller = Seller::find($request->id);

    if ($seller) {
        $seller->show_publish = !$seller->show_publish;
        $seller->save();

        return response()->json(['success' => true, 'show_publish' => $seller->show_publish]);
    }

    return response()->json(['success' => false], 404);
   }


   public function logoutseller(Request $request)
   {
    $seller = Seller::find($request->seller_id);
       if ($seller) {
           $seller->api_token = null;
       }
       return response()->json([], 204);

               }

}




