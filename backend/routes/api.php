<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AmenityController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CarStickerRequestController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\HouseholdPermissionController;
use App\Http\Controllers\IncomeExpensesController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PermitPaymentController;
use App\Http\Controllers\PermitRequestController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\SettingsController;
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
        Route::get('/members/{houseId}', [HouseController::class, 'getHouseMembers']);
    });
    Route::apiResource('houses',HouseController::class);

    //resident routes
    Route::get('/residents/block/{blockNumber}', 
    [ResidentController::class, 'getResidentsPerBlock']);
    Route::apiResource('residents', ResidentController::class);
    Route::get('/residents/homeowners', [ResidentController::class, 'getHomeOwners']);

    //route for total number use for dashboard
    Route::get('/total-homeowners', [ResidentController::class, 'getTotalHomeowners']);


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
    Route::get('/bookings/recent-pending', [BookingController::class, 'getPendingBookings']);

    //amenity routes
    Route::apiResource('/amenities', AmenityController::class);

    //anouncement routes
    Route::apiResource('announcements', AnnouncementController::class);
    Route::post('/announcements/img/{id}', 
    [AnnouncementController::class, 'updateAnnouncementImg']);

    //bills (dashboard)
    Route::get('/bills/most-unpaid-residents', [BillController::class, 'topResidentsWithUnpaidBills']);
    
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
    Route::post('/bills/overdue/{page}', [BillController::class, 'getOverdueBills']);
    Route::post('/bills/notify-overdue', [BillController::class, 'notifyOverdueBills']);
    Route::post('/bills-resident-overdues/{page}', [BillController::class, 'getResidentsWithOverdues']);
    
    //transaction routes (monthly due bills)
    Route::post('/bills/pay-edit-bill', [TransactionController::class, 'updateBillAndAddPayment']);
    Route::post('/bills/pay-edit-bills', [TransactionController::class, 'updateBillAndAddPayments']);
    Route::post('/transactions/recent-paid', [TransactionController::class, 'getRecentPaidTransactions']);

    //permit routes
    Route::post('/permit-requests', [PermitRequestController::class, 'store']);
    Route::get('/get-permit-request/{id}', [PermitRequestController::class, 'show']);
    Route::get('/permits/resident/{residentId}', [PermitRequestController::class, 'getPermitRequestsByResident']);
    Route::get('/payments/resident/{residentId}', [PermitPaymentController::class, 'getPaymentHistory']);
    Route::get('/approved-permits/{residentId}', [PermitRequestController::class, 'getApprovedRequests']);
    //permit but for admin
    Route::get('/permit-requests/{status}', [PermitRequestController::class, 'getPermitRequestsByStatus']);
    Route::post('/permit-requests/{id}/approve',[PermitRequestController::class, 'approve']);
    Route::post('/permit-requests/{id}/reject',[PermitRequestController::class, 'reject']);
    Route::post('/permit-requests/{id}/complete', [PermitRequestController::class, 'completePermitRequest']);
    Route::put('/permit-requests/{id}/claim', [PermitRequestController::class, 'claimPermitRequest']);

    //permit payments
    Route::post('/permit-payments/add-payment', [PermitPaymentController::class, 'addPayment']);
    Route::get('/permit-payments/download-receipt/{paymentId}', [PermitPaymentController::class, 'downloadReceipt']);
    
    //car sticker routes
    Route::get('/sticker-payments', [StickerPaymentController::class, 'getPaymentHistory']);
    Route::post('/sticker-payments/add-payment', [StickerPaymentController::class, 'addPayment']);
    Route::get('approved-sticker-request/{id}', [CarStickerRequestController::class, 'show']);
    Route::prefix('car-sticker-requests')->group(function () {
   
        // Route to update a specific car sticker request by ID
        Route::put('{id}', [CarStickerRequestController::class, 'update']);
    
        // Route to delete a specific car sticker request by ID
        Route::delete('{id}', [CarStickerRequestController::class, 'destroy']);
    });
    //requests (for resident)
    Route::post('/car-sticker-requests', [CarStickerRequestController::class, 'store']);
    Route::get("/approved-sticker-requests/{residentId}", [CarStickerRequestController::class, 'getApprovedRequests']);
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
    Route::post('/send-notification-to-all', [NotificationController::class, 'sendNotificationToAll']);
    Route::post('/send-notification-to-user', [NotificationController::class, 'sendNotificationToUser']);

    //regular notifications

    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index']); // Get all notifications
        Route::post('/', [NotificationController::class, 'store']); // Create a notification
        Route::get('/{id}', [NotificationController::class, 'show']); // Get a single notification
        Route::put('/{id}', [NotificationController::class, 'update']); // Update a notification
        Route::delete('/{id}', [NotificationController::class, 'destroy']); // Delete a notification
        Route::get('/user/{user_id}', [NotificationController::class, 'getNotificationsByUser']);
        Route::patch('/read/{id}', [NotificationController::class, 'markNotificationAsRead']);

    });

    
    //complaints
    Route::apiResource('complaints', ComplaintController::class);
    Route::get("/get-complaints/{status}", [ComplaintController::class, 'getComplaints']);
    Route::post('/complaints/{id}/solve', [ComplaintController::class, 'solveComplaint']);

    //REPORTS
    Route::get('/reports/resident-bills', [ReportsController::class, 'generateDuesPdf']);
    Route::get('/reports/resident-bill-data', [ReportsController::class, 'generateDuesData']);
    Route::get('/reports/profile-pdf', [ReportsController::class, 'generateResidentProfilePdf']);
    Route::get('/reports/profile-data', [ReportsController::class, 'generateResidentProfileData']);
    Route::get('/reports/complaints-pdf', [ReportsController::class, 'generateComplaintsPdf']);
    Route::get('/reports/complaints-data', [ReportsController::class, 'generateComplaintsData']);

    //ADMIN SETTINGS
    Route::get('/settings', [SettingsController::class, 'index']);
    Route::post('/settings', [SettingsController::class, 'update']);
    Route::get('/settings/{key}', [SettingsController::class, 'getSetting']);

    //DASHBOARD
    Route::get('/total-residents', [ResidentController::class, 'getTotalResidents']);
    Route::get('/total-bookings-this-month', [BookingController::class, 'getTotalBookingsThisMonth']);
    Route::get('/overdue-bills-count', [BillController::class, 'countOverdue']);
    Route::get('/{amenityId}', [BookingController::class, 'getBookingsAdmin']);
    Route::get('/bills/most-unpaid-residents', [BillController::class, 'topResidentsWithPendingBills']);
    Route::get('/overdue-residents', [BillController::class, 'getOverdueBills']);

    //INCOME AND EXPENSES
    Route::apiResource('expenses', ExpenseController::class);
    Route::post('/get-expenses', [ExpenseController::class,'getExpenses']);
    Route::post('/income-totals', [IncomeExpensesController::class, 'getTotalIncome']);
    Route::post('/export-income-expenses', [IncomeExpensesController::class, 'exportIncomeExpenses']);

    //HOUSEHOLD PERMISSIONS
    Route::post('/household/create-account', [HouseholdPermissionController::class, 'createAccount']);
    Route::post('/permissions/grant', [HouseholdPermissionController::class, 'grantPermission']);
    Route::post('/permissions/revoke', [HouseholdPermissionController::class, 'revokePermission']);
    Route::get('/permissions/{houseId}', [HouseholdPermissionController::class, 'listPermissions']);
});

//booking routes (avaialable to the public)
Route::post('/bookings/public', 
[BookingController::class, 'getBookingsByYearAndMonth']);
Route::post('/bookings',[BookingController::class, 'store']);
Route::get('/bookings/{id}',[BookingController::class, 'show']);

//test notification only

Route::get('/testing', function () {
    return response()->json(['message'=>'hello']);
});