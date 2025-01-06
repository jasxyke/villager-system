<?php

namespace App\Http\Controllers;

use App\Helpers\PushNotificationHelper;
use App\Models\Notification;
use App\Models\ExpoUserToken;
use App\Models\User;
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

    /**
     * Get all notifications for a specific user.
     */
    public function getNotificationsByUser($user_id)
    {
        try {
            $user = User::findOrFail($user_id); // Ensure the user exists
            $notifications = $user->notifications()->get(); // Assuming a relation exists

            return response()->json([
                'success' => true,
                'data' => $notifications,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching notifications for user',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Mark a notification as read.
     */
    public function markNotificationAsRead($id)
    {
        try {
            $notification = Notification::findOrFail($id);

            // Update the read_status field
            $notification->update(['read_status' => 'read']);

            return response()->json([
                'success' => true,
                'message' => 'Notification marked as read',
                'data' => $notification,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Get all notifications.
     */
    public function index()
    {
        try {
            $notifications = Notification::all();
            return response()->json([
                'success' => true,
                'data' => $notifications,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching notifications',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a new notification.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'caption' => 'required|string|max:100',
            'content' => 'required|string|max:1000',
            'read_status' => 'required|in:read,unread',
        ]);

        try {
            $notification = Notification::create($request->all());
            return response()->json([
                'success' => true,
                'data' => $notification,
                'message' => 'Notification created successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating notification',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get a single notification by ID.
     */
    public function show($id)
    {
        try {
            $notification = Notification::findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $notification,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Notification not found',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Update an existing notification.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'caption' => 'sometimes|string|max:100',
            'content' => 'sometimes|string|max:1000',
            'read_status' => 'sometimes|in:read,unread',
        ]);

        try {
            $notification = Notification::findOrFail($id);
            $notification->update($request->all());
            return response()->json([
                'success' => true,
                'data' => $notification,
                'message' => 'Notification updated successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating notification',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a notification by ID.
     */
    public function destroy($id)
    {
        try {
            $notification = Notification::findOrFail($id);
            $notification->delete();
            return response()->json([
                'success' => true,
                'message' => 'Notification deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting notification',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}