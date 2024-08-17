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
        $randomPath = $this->faker->randomElement([null,'default_img.jpg']);
        $randomUrl = null;
        if($randomPath != null){
            $randomUrl = Storage::disk('public')->url('default_img.jpg');
        }

        $eventDateTime = $this->faker->dateTimeBetween('-1 week','+1 week')->format('Y-m-d H:i');
        return [
            'admin_id'=>Admin::factory(),
            'title'=>$this->faker->sentence(5),
            'content'=>$this->faker->sentence(20),
            'picture_path'=> $randomPath,
            'picture_url' => $randomUrl,
            'event_date_time' => $eventDateTime
        ];
    }
}