<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HouseController;
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

    //houses routes
    Route::prefix('houses')->group(function(){
        Route::get('/{blockNumber}',[HouseController::class,
        'getHousesPerBlock']);
    });
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
    });//users prefix

    //admin CRUD routes for Users and Residents
    Route::prefix('admin')->group(function (){
        Route::apiResource('users', UserController::class);
        Route::apiResource('residents', ResidentController::class);
        Route::get('/bookings/{year}/{month}',
        [BookingController::class, 'getBookingsAdmin']);
    });

    //booking routes (avaialable only to the admins)
    Route::put('/bookings/{id}',[BookingController::class,'update']);
    Route::delete('/bookings/{id}',[BookingController::class,'destroy']);

    //anouncement routes
    Route::apiResource('announcements', AnnouncementController::class);
    Route::put('/announcements/img/{id}', 
    [AnnouncementController::class, 'updateAnnouncementImg']);
});

//booking routes (avaialable to the public)
Route::get('/bookings/{year}/{month}', 
[BookingController::class, 'getBookingsByYearAndMonth']);
Route::post('/bookings',[BookingController::class, 'store']);
Route::get('/bookings/{id}',[BookingController::class, 'show']);