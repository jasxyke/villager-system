<?php

namespace App\Helpers;

use App\Models\User;
use App\Models\ExpoUserToken;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ExpoNotification;

class PushNotificationHelper
{
    /**
     * Send a push notification to all users with Expo tokens.
     *
     * @param string $title
     * @param string $body
     * @return array
     */
    public static function sendToAll(string $title, string $body): array
    {
        // Retrieve all Expo tokens
        $tokens = ExpoUserToken::pluck('expo_token')->toArray();

        if (empty($tokens)) {
            return ['success' => false, 'message' => 'No Expo tokens found'];
        }

        try {
            // Use the Notification facade to send to all tokens
            Notification::route('expo', $tokens)
                ->notify(new ExpoNotification($title, $body, $tokens));

            return ['success' => true, 'message' => 'Notification sent successfully to all users!'];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => 'Failed to send notifications: ' . $e->getMessage()];
        }
    }

    /**
     * Send a push notification to a specific user by user ID.
     *
     * @param int $userId
     * @param string $title
     * @param string $body
     * @return array
     */
    public static function sendToUser(int $userId, string $title, string $body): array
    {
        try {
            // Retrieve the user
            $user = User::findOrFail($userId);

            // Retrieve the Expo token for the user
            $expoToken = ExpoUserToken::where('user_id', $userId)->value('expo_token');

            if (!$expoToken) {
                return ['success' => false, 'message' => 'Expo token not found for the user'];
            }

            // Use the user's notify method to send the notification
            $user->notify(new ExpoNotification($title, $body, [$expoToken]));

            return ['success' => true, 'message' => 'Notification sent successfully to the user!'];
        } catch (\Exception $e) {
            return ['success' => false, 'message' => 'Failed to send notification: ' . $e->getMessage()];
        }
    }
}