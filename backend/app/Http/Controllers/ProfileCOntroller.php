<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\CaloriesUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function updateImage(Request $request)
    {
        // Validate the request
        $request->validate([
            'id' => 'required|exists:users,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $id = $request->query('id');

        // Find the user by ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if ($user->profile && $user->profile !== 'profile.png') {
            if (file_exists(public_path('uploads/profiles/' . $user->profile))) {
                unlink(public_path('uploads/profiles/' . $user->profile));
            }
        }

        $imageName = time() . '.' . $request->file('image')->extension();
        $request->file('image')->move(public_path('uploads/profiles'), $imageName);

        // Update the user's profile image in the database
        $user->update(['profile' => $imageName]);

        return response()->json(['message' => 'Profile image updated successfully']);
    }

    public function showImage(Request $request)
    {
        $id = $request->query('id');

        // Find the user by ID
        $user = User::find($id);

        if (!$user || !$user->profile) {
            return response()->json(['error' => 'User or profile image not found'], 404);
        }

        // Get the path to the profile image
        $imagePath = public_path('uploads/profiles/' . $user->profile);

        // Check if the image file exists
        if (!file_exists($imagePath)) {
            return response()->json(['error' => 'Profile image not found'], 404);
        }

        // Return the image file
        return response()->file($imagePath);
    }

    public function removeImage(Request $request)
    {
        $id = $request->query('id');

        // Find the user by ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        if ($user->profile && $user->profile !== 'profile.png') {
            if (file_exists(public_path('uploads/profiles/' . $user->profile))) {
                unlink(public_path('uploads/profiles/' . $user->profile));
            }

            // Reset profile image to default
            $user->update(['profile' => 'profile.png']);
        }

        return response()->json(['message' => 'Profile image reset to default successfully']);
    }

    public function verifyCurrentPassword(Request $request)
{
    $request->validate([
        'id' => 'required|exists:users,id',
        'current_password' => 'required',
    ]);

    $user = User::find($request->id);

    if (Hash::check($request->current_password, $user->password)) {
        return response()->json(['message' => 'Password is correct'], 200);
    } else {
        return response()->json(['error' => 'Current password is incorrect'], 400);
    }
}

public function updateUserInfo(Request $request)
{
    $id = $request->id;

    $user = User::find($id);

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    $user->update([
        'lastName' => $request->lastName,
        'firstName' => $request->firstName,
        'gendre' => $request->gendre,
        'email' => $request->email,
        'name' => $request->name,
    ]);

    $caloriesUser = CaloriesUser::where('user_id', $id)->first();

    // Check if $caloriesUser exists
    if (!$caloriesUser) {
        // Create a new CaloriesUser instance and associate it with the user
        $caloriesUser = new CaloriesUser();
        $caloriesUser->user_id = $id;
    }

    // Update the CaloriesUser data
    $caloriesUser->update([
        'birthday' => $request->birthday,
        'height' => $request->height,
        'weight' => $request->weight,
        'goal_id' => $request->goal_id,
        'activity_id' => $request->activity_id,
    ]);

    return response()->json(['message' => 'User information and CaloriesUser updated successfully']);
}



public function getUserInfo(Request $request)
{
    $id = $request->query('id');

    $user = User::find($id);

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    $caloriesUser = CaloriesUser::where('user_id', $id)->first();

    // Check if $caloriesUser exists
    if (!$caloriesUser) {
        // Set default values for the fields
        $defaultCaloriesUser = new CaloriesUser();
        $defaultCaloriesUser->birthday = "";
        $defaultCaloriesUser->height = "";
        $defaultCaloriesUser->weight = "";
        $defaultCaloriesUser->goal_id = "";
        $defaultCaloriesUser->activity_id = "";

        return response()->json(['user' => $user, 'caloriesUser' => $defaultCaloriesUser], 200);
    }

    return response()->json(['user' => $user, 'caloriesUser' => $caloriesUser], 200);
}



}
