<?php

use App\Http\Controllers\AmenityController;
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
        Route::post('/blocks',[HouseController::class,
        'getHousesPerBlocks']);
        Route::get('/block/{blockNumber}',[HouseController::class,
        'getHousesPerBlock']);
    });
    Route::apiResource('houses',HouseController::class);

    //resident routes
    Route::get('/residents/block/{blockNumber}', 
    [ResidentController::class, 'getResidentsPerBlock']);
    Route::apiResource('residents', ResidentController::class);

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
        // Route::apiResource('users', UserController::class);
        //Route::apiResource('residents', ResidentController::class);
        Route::get('/bookings/{amenityId}',
        [BookingController::class, 'getBookingsAdmin']);
    });


    //booking routes (avaialable only to the admins)
    Route::put('/bookings',[BookingController::class,'update']);
    Route::delete('/bookings/{id}',[BookingController::class,'destroy']);
    Route::get('/bookings', [BookingController::class, 'index']);

    //amenity routes
    Route::apiResource('/amenities', AmenityController::class);

    //anouncement routes
    Route::apiResource('announcements', AnnouncementController::class);
    Route::post('/announcements/img/{id}', 
    [AnnouncementController::class, 'updateAnnouncementImg']);
});

//booking routes (avaialable to the public)
Route::post('/bookings/public', 
[BookingController::class, 'getBookingsByYearAndMonth']);
Route::post('/bookings',[BookingController::class, 'store']);
Route::get('/bookings/{id}',[BookingController::class, 'show']);