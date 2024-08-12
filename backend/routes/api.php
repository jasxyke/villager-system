<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    //resident routes
    Route::get('/residents/block/{blockNumber}', 
    [ResidentController::class, 'getResidentsPerBlock']);
    //user routes
    Route::apiResource('users', UserController::class);
    Route::prefix('users')->group(function (){
        Route::post('/change-profile-pic', 
        [UserController::class, 'changePicture']);
        Route::post('/change-password', [UserController::class, 
        'changePassword']);
    });
});


//guest routes

//admin routes
Route::prefix('admin')->group(function (){
    Route::apiResource('users', UserController::class);
    Route::apiResource('residents', ResidentController::class);
});