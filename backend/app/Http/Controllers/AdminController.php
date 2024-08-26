<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
  // Display a listing of admins
  public function index()
  {
      $admins = Admin::with('user')->get();
      return response()->json($admins);
  }

  // Store a newly created admin in storage
  public function store(Request $request)
  {
      $request->validate([
          'firstname' => 'required|string|max:100',
          'lastname' => 'required|string|max:50',
          'email' => 'required|email|unique:users,email',
          'password' => 'required|string|min:8',
          'role_type' => 'required|in:admin,treasurer'
      ]);

      $user = User::create([
          'firstname' => $request->firstname,
          'lastname' => $request->lastname,
          'email' => $request->email,
          'password' => Hash::make($request->password),
          'role_type' => $request->role_type
      ]);

      Admin::create(['user_id' => $user->id]);

      return response()->json($user, Response::HTTP_CREATED);
  }

  // Display the specified admin
  public function show(Admin $admin)
  {
      return response()->json($admin->load('user'));
  }

  // Update the specified admin in storage
  public function update(Request $request, string $id)
  {
    $admin = Admin::findOrFail($id);

      $request->validate([
          'firstname' => 'required|string|max:100',
          'lastname' => 'required|string|max:50',
          'email' => 'required|email|unique:users,email,' . $admin->user->id,
          'password' => 'nullable|string|min:8',
          'role_type' => 'required|in:admin,treasurer'
      ]);

      $user = $admin->user;
      $user->update([
          'firstname' => $request->firstname,
          'lastname' => $request->lastname,
          'email' => $request->email,
          'role_type' => $request->role_type
      ]);

      if ($request->password) {
          $user->update(['password' => Hash::make($request->password)]);
      }

      return response()->json($user);
  }

  // Remove the specified admin from storage
  public function destroy(string $id)
  {
      $admin = Admin::find($id);
      $admin->delete();

      return response()->json(['messsage'=>'Admin successfuly deleted.']);
  }
}
