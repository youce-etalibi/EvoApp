<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Seller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class AuthController extends Controller
{
   
    public function signup(Request $request){
        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password');

        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->password = bcrypt($password);
        $user->save();

        $token = Str::random(60);
        $user->api_token = hash('sha256', $token);
        $user->save();

        return response()->json(['message' => 'User registered successfully', 'user' => $user, 'token' => $token,'userid'=>$user->id], 201);

    }

    public function signin(Request $request){
     
        $credentials = ['email' => $request->email, 'password' => $request->password];

        User::where('email',$request->email)->get();
        if (!Auth::attempt($credentials)) {
                        return response()->json([
                                'status' => 404,
                                'message' => 'Email or password incorrect',
                            ], 404);
                        } else {

                          $user = User::where('email', $request->email)->first();
                                $token = Str::random(60);
        
                                $user->api_token = hash('sha256', $token);
                                $userSeller = Seller::where('usr_id',$user->id)->first();
                                $idseller = null;
            
                if ($userSeller) {
                    $idseller = $userSeller->id;
                }
        
                                if ($user) {
                        return response()->json([
                            'status' => 200,
                            'valid' => true,
                            'user' =>  $user,
                            'userid' =>  $user->id,
                            'token' => $token,
                            'idseller' => $idseller
                        ], 200);
                    } else {
                            return response()->json([
                                    'status' => 500,
                                    'message' => 'Failed to save token',
                                ], 500);
                            }
                        }
            }

            public function googleSignup(Request $request)
            {
                // Check if a user with the provided email exists
                $user = User::where('email', $request->email)->first();
                
                // If the user doesn't exist, create a new user
                if (!$user) {
                    $user = User::create([
                        'name' => $request->name,
                        'email' => $request->email,
                        'password' => Hash::make(Str::random(24)), 
                    ]);
                }
            
                // Find the corresponding seller by user ID
                $userSeller = Seller::where('usr_id', $user->id)->first();
            
                // Initialize seller ID as null
                $idseller = null;
            
                // Check if userSeller is not null and assign its ID to $idseller
                if ($userSeller) {
                    $idseller = $userSeller->id;
                }
            
                // Generate an authentication token for the user
                $token = $user->createToken('auth_token')->plainTextToken;
            
                // Return the response with user and seller details
                return response()->json([
                    'user' => $user,
                    'userid' => $user->id,
                    'token' => $token,
                    'idseller' => $idseller,
                ]);
            }
            

            public function checkUser(Request $request)
            {
                $user = User::where('email', $request->email)->first();
            
                if ($user) {
                    $token = Str::random(60);
        
                    $user->api_token = hash('sha256', $token);
            
                    $userSeller = Seller::where('usr_id', $user->id)->first();
                    
                    $idseller = null;
            
                    if ($userSeller) {
                        $idseller = $userSeller->id;
                    }
                    return response()->json([
                        'exists' => true,
                        'userid' => $user->id,
                        'token' => $token,
                        'idseller' => $idseller,
                    ]);
                } else {
                    return response()->json(['exists' => false]);
                }
            }
            


public function getuser(Request $request)
{
    $userId = $request->query('id');

    if (!$userId) {
        return response()->json(['error' => 'User ID is required'], 400);
    }
    $user = User::with('client')->find($userId);
    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }
    return response()->json(['user' => $user], 200);
}


public function logout(Request $request)
{
    if ($request->user()) {
        $request->user()->tokens()->delete();
    }
    return response()->json([], 204);

            }

}
