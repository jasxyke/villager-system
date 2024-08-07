<?php

namespace Database\Factories;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Announcement>
 */
class AnnouncementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'admin_id'=>Admin::factory(),
            'title'=>$this->faker->sentence(5),
            'content'=>$this->faker->sentence(20),
            'picture_path'=> 'default_img.jpg',
            'picture_url' => Storage::disk('public')->url('default_img.jpg'),
            'event_date_time' => $this->faker->dateTime()
        ];
    }
}