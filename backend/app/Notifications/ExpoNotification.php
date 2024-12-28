<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use YieldStudio\LaravelExpoNotifier\Dto\ExpoMessage;
use YieldStudio\LaravelExpoNotifier\ExpoNotificationsChannel;

class ExpoNotification extends Notification
{
    use Queueable;

    protected string $title;
    protected string $body;

    /**
     * Create a new notification instance.
     *
     * @param string $title
     * @param string $body
     */
    public function __construct(string $title, string $body)
    {
        $this->title = $title;
        $this->body = $body;
    }

    /**
     * Determine which channels the notification will be sent on.
     */
    public function via($notifiable): array
    {
        return [ExpoNotificationsChannel::class];
    }

    /**
     * Create the Expo push notification message.
     */
    public function toExpoNotification($notifiable): ExpoMessage
    {
        return (new ExpoMessage())
            ->to($notifiable->expoTokens->pluck('value')->toArray()) // Fetch tokens
            ->title($this->title)
            ->body($this->body)
            ->channelId('default');
    }
}