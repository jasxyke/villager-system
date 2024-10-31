<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AmenityController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CarStickerRequestController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PermitPaymentController;
use App\Http\Controllers\PermitRequestController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\StickerPaymentController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\CarStickerRequest;
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
        Route::get('/search', [HouseController::class, 'search']);
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
    Route::prefix('admins')->group(function (){
        // Route::apiResource('users', UserController::class);
        //Route::apiResource('residents', ResidentController::class);
        Route::get('/bookings/{amenityId}',
        [BookingController::class, 'getBookingsAdmin']);
        Route::get('/', [AdminController::class, 'index']);
        Route::post('/', [AdminController::class, 'store']);
        Route::get('/{admin}', [AdminController::class, 'show']);
        Route::put('/{admin}', [AdminController::class, 'update']);
        Route::delete('/{admin}', [AdminController::class, 'destroy']);
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

    //bills routes
    Route::get('/bills', [BillController::class, 'index']);
    Route::post('/bills', [BillController::class, 'store']);
    Route::get('/bills/{id}', [BillController::class, 'show']);
    Route::put('/bills/{id}', [BillController::class, 'update']);
    Route::delete('/bills/{id}', [BillController::class, 'destroy']);
    Route::post('/bills/generate-monthly', [BillController::class, 'generateMonthlyBills']);
    Route::get('/bills/resident/{resident_id}', [BillController::class, 'getUserBills']);
    Route::post('/bills/admin', [BillController::class, 'getMonthlyBills']);
    //overdue bills
    Route::get('/bills/overdue/{page}', [BillController::class, 'getOverdueBills']);
    Route::post('/bills/notify-overdue', [BillController::class, 'notifyOverdueBills']);
    
    //transaction routes (monthly due bills)
    Route::post('/bills/pay-edit-bill', [TransactionController::class, 'updateBillAndAddPayment']);
    Route::post('/transactions/recent-paid', [TransactionController::class, 'getRecentPaidTransactions']);

    //permit routes
    Route::post('/permit-requests', [PermitRequestController::class, 'store']);
    Route::get('/permits/resident/{residentId}', [PermitRequestController::class, 'getPermitRequestsByResident']);
    Route::get('/payments/resident/{residentId}', [PermitPaymentController::class, 'getPaymentHistory']);

    Route::get('/permit-requests', [PermitRequestController::class, 'index']);
    Route::post('/permit-requests/{id}/approve',[PermitRequestController::class, 'approve']);
    Route::post('/permit-requests/{id}/reject',[PermitRequestController::class, 'reject']);

    //car sticker routes
    Route::get('/sticker-payments', [StickerPaymentController::class, 'getPaymentHistory']);
    Route::post('/sticker-payments/add-payment', [StickerPaymentController::class, 'addPayment']);
    //requests
    Route::post('/car-sticker-requests', [CarStickerRequestController::class, 'store']);
    //FOR ADMIN
    Route::get('/car-sticker-requests/status/{status}', [CarStickerRequestController::class, 'getRequestsByStatus']);
    Route::put('/car-sticker-requests/{id}/complete', [CarStickerRequestController::class, 'completeStickerRequest']);
    Route::put('/car-sticker-requests/{id}/claim', [CarStickerRequestController::class, 'claimStickerRequest']);
    //FOR RESIDENT
    Route::get('/car-sticker-requests', [CarStickerRequestController::class, 'getPendingRequests']);
    //==============
    Route::put('/car-sticker-requests/approve/{id}', [CarStickerRequestController::class, 'approveRequest']);
    Route::put('/car-sticker-requests/{id}/reject', [CarStickerRequestController::class, 'rejectRequest']);

    //push notifications
    Route::post('/expo-token', [NotificationController::class, 'storeExpoToken']);
    
    //complaints
    Route::apiResource('complaints', ComplaintController::class);
    Route::get("/get-complaints/{status}", [ComplaintController::class, 'getComplaints']);
    Route::patch('/complaints/{id}/solve', [ComplaintController::class, 'solveComplaint']);

    //REPORTS
    Route::get('/reports/resident-bills', [ReportsController::class, 'generatePdfReport']);
    Route::get('/reports/resident-bill-data', [ReportsController::class, 'fetchResidentBillData']);
});

//booking routes (avaialable to the public)
Route::post('/bookings/public', 
[BookingController::class, 'getBookingsByYearAndMonth']);
Route::post('/bookings',[BookingController::class, 'store']);
Route::get('/bookings/{id}',[BookingController::class, 'show']);

//test notification only
Route::get('/send-test-notification', [NotificationController::class, 'sendTestNotification']);