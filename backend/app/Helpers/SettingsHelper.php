<?php

namespace App\Helpers;

use App\Models\Setting;

class SettingsHelper
{
    public static function get($key)
    {
        $setting = Setting::where('key', $key)->first();
        return $setting ? $setting->value : null;
    }

    public static function set($key, $value)
    {
        Setting::updateOrCreate(['key' => $key], ['value' => $value]);
    }

    /**
     * Get all settings as key-value pairs.
     *
     * @return array
     */
    public static function all()
    {
        return Setting::pluck('value', 'key')->toArray();
    }
}