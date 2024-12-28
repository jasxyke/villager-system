<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Http\Requests\StoreNotificationRequest;
use App\Http\Requests\UpdateNotificationRequest;
use App\Models\ExpoToken;
use App\Models\ExpoUserToken;
use App\Models\User;
use App\Notifications\ExpoNotification;
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

    /**
     * Send a test notification to a specific user.
     */
    public function sendTestNotification(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string',
            'body' => 'required|string',
        ]);

        try {
            $user = User::findOrFail($validated['user_id']);

            // Send notification using Laravel's Notification system
            $user->notify(new ExpoNotification($validated['title'], $validated['body']));

            return response()->json(['message' => 'Notification sent successfully!']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to send notification: ' . $e->getMessage()], 500);
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