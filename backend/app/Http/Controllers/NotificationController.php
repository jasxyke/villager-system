<?php

namespace App\Http\Controllers;

use App\Helpers\PushNotificationHelper;
use Illuminate\Support\Facades\Notification;
use App\Models\ExpoUserToken;
use App\Models\User;
use App\Notifications\ExpoNotification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Store or update an Expo token for a user.
     */
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
     * Send a notification to all users with Expo tokens.
     */
    public function sendNotificationToAll(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
        ]);

        $result = PushNotificationHelper::sendToAll($validated['title'], $validated['body']);

        return response()->json($result, $result['success'] ? 200 : 500);
    }

    /**
     * Send a notification to a specific user.
     */
    public function sendNotificationToUser(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string',
            'body' => 'required|string',
        ]);

        $result = PushNotificationHelper::sendToUser(
            $validated['user_id'],
            $validated['title'],
            $validated['body']
        );

        return response()->json($result, $result['success'] ? 200 : 500);
    }

    // Other methods remain unchanged
}