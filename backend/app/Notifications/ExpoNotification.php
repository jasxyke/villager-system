<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use YieldStudio\LaravelExpoNotifier\Dto\ExpoMessage;
use YieldStudio\LaravelExpoNotifier\ExpoNotificationsChannel;

class ExpoNotification extends Notification
{
    use Queueable;

    protected string $title;
    protected string $body;
    protected array $tokens;

    /**
     * Create a new notification instance.
     *
     * @param string $title
     * @param string $body
     * @param array $tokens Optional list of tokens for sending the notification to multiple users.
     */
    public function __construct(string $title, string $body, array $tokens = [])
    {
        $this->title = $title;
        $this->body = $body;
        $this->tokens = $tokens;
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
        // If tokens are explicitly provided, use them. Otherwise, fallback to the notifiable's tokens.
        $tokens = !empty($this->tokens)
            ? $this->tokens
            : $notifiable->expoUserTokens->pluck('expo_token')->toArray();

        return (new ExpoMessage())
            ->to($tokens)
            ->title($this->title)
            ->body($this->body)
            ->channelId('default');
    }
}