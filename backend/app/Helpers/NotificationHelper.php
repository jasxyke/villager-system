<?php

namespace App\Helpers;

use App\Models\Notification;

class NotificationHelper
{
    /**
     * Create a new notification for a user.
     *
     * @param int $userId
     * @param string $caption
     * @param string $content
     * @param string $readStatus
     * @return Notification
     */
    public static function createNotification(int $userId, string $caption, string $content, string $readStatus = 'unread'): Notification
    {
        return Notification::create([
            'user_id' => $userId,
            'caption' => $caption,
            'content' => $content,
            'read_status' => $readStatus,
        ]);
    }

    /**
     * Mark a notification as read.
     *
     * @param int $notificationId
     * @return bool
     */
    public static function markAsRead(int $notificationId): bool
    {
        $notification = Notification::findOrFail($notificationId);
        $notification->read_status = 'read';
        return $notification->save();
    }

    /**
     * Mark all notifications for a user as read.
     *
     * @param int $userId
     * @return int Number of updated rows
     */
    public static function markAllAsRead(int $userId): int
    {
        return Notification::where('user_id', $userId)
            ->where('read_status', 'unread')
            ->update(['read_status' => 'read']);
    }

    /**
     * Get all notifications for a user.
     *
     * @param int $userId
     * @param string|null $readStatus Filter by read status ('read', 'unread', or null for all)
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getUserNotifications(int $userId, string $readStatus = null)
    {
        $query = Notification::where('user_id', $userId);
        
        if ($readStatus) {
            $query->where('read_status', $readStatus);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    /**
     * Delete a notification.
     *
     * @param int $notificationId
     * @return bool
     */
    public static function deleteNotification(int $notificationId): bool
    {
        $notification = Notification::findOrFail($notificationId);
        return $notification->delete();
    }

    /**
     * Delete all notifications for a user.
     *
     * @param int $userId
     * @return int Number of deleted rows
     */
    public static function deleteAllUserNotifications(int $userId): int
    {
        return Notification::where('user_id', $userId)->delete();
    }
}