<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Http\Requests\StoreNotificationRequest;
use App\Http\Requests\UpdateNotificationRequest;
use App\Models\ExpoToken;
use App\Models\ExpoUserToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NotificationController extends Controller
{

    public function storeExpoToken(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'token' => 'required|string',
        ]);

        // Store or update the token
        ExpoUserToken::updateOrCreate(
            ['user_id' => $validated['user_id']],
            ['expo_token' => $validated['token']]
        );

        return response()->json(['message' => 'Token stored successfully!']);
    }

    // Method to send a test notification to all users
    public function sendTestNotification()
    {
        // Retrieve all stored expo tokens
        $tokens = ExpoUserToken::pluck('expo_token')->all();

        // Message content for the notification
        $message = [
            'title' => 'Test Notification',
            'body' => 'This is a test push notification!',
        ];

        // Send notification to all tokens
        foreach ($tokens as $token) {
            $this->sendPushNotification($token, $message);
        }

        return response()->json(['message' => 'Test notification sent!']);
    }

    // Helper function to send the notification
    protected function sendPushNotification($expoPushToken, $message)
    {
        $response = Http::post('https://exp.host/--/api/v2/push/send', [
            'to' => $expoPushToken,
            'sound' => 'default',
            'title' => $message['title'],
            'body' => $message['body'],
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to send push notification'], 500);
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