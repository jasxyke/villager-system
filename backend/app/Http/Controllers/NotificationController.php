<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Http\Requests\StoreNotificationRequest;
use App\Http\Requests\UpdateNotificationRequest;
use Illuminate\Support\Facades\Http;

class NotificationController extends Controller
{
    public function sendTestNotification()
    {
        $expoPushToken = 'ExponentPushToken[CEoDCZD_5sTzL0PHE-zjIE]'; // Replace with your Expo push token

        $response = Http::post('https://exp.host/--/api/v2/push/send', [
            'to' => $expoPushToken,
            'sound' => 'default',
            'title' => 'Test Notification',
            'body' => 'This is a test notification sent from Laravel',
        ]);

        if ($response->successful()) {
            return response()->json(['message' => 'Notification sent successfully!']);
        } else {
            return response()->json(['error' => 'Failed to send notification'], 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNotificationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNotificationRequest $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        //
    }
}
