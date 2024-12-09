<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    public function index()
    {
        // Fetch all settings and return them as key-value pairs
        $settings = Setting::all()->pluck('value', 'key');
        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $settings = $request->all();

        foreach ($settings as $key => $value) {
            // Check if the setting is for an image upload
            if (in_array($key, ['logo_1', 'logo_2','e_wallet_pic']) && $request->hasFile($key)) {
                
                // return response()->json(['message' => in_array($key, ['logo_1', 'logo_2'])]);
                // return response()->json(['message' => $request->hasFile($key)]);
                $file = $request->file($key);

                // Save the file to the 'public/logos' directory
                $filePath = $file->store('logos', 'public');
                $fileUrl = Storage::disk('public')->url($filePath);

                // Update the path and URL settings
                Setting::updateOrCreate(['key' => "{$key}_path"], ['value' => $filePath]);
                Setting::updateOrCreate(['key' => "{$key}_url"], ['value' => $fileUrl]);
            } else {
                // For non-file settings, update or create as usual
                Setting::updateOrCreate(['key' => $key], ['value' => $value]);
            }
        }

        return response()->json(['message' => 'Settings updated successfully.']);
    }

    public function getSetting($key)
    {
        $setting = Setting::where('key', $key)->first();

        if (!$setting) {
            return response()->json(['message' => 'Setting not found.'], 404);
        }

        return response()->json([$key => $setting->value]);
    }
}