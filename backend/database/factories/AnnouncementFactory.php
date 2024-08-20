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

        $eventStartDate = $this->faker->dateTimeBetween('-1 week','+1 week')->format('Y-m-d');
        $eventEndDate = $this->faker->dateTimeBetween($eventStartDate, $eventStartDate . ' +3 days')->format('Y-m-d');
        $eventStartTime = $this->faker->dateTimeBetween($eventStartDate . ' +7 hour',$eventStartDate . ' +10 hour')->format('H');
        $eventEndTime = $this->faker->dateTimeBetween($eventStartTime, $eventStartTime . ' +1 hour')->format('H:i');

        return [
            'admin_id'=>Admin::factory(),
            'title'=>$this->faker->sentence(5),
            'content'=>$this->faker->sentence(20),
            'picture_path'=> $randomPath,
            'picture_url' => $randomUrl,
            'event_start_date'=> $eventStartDate,
            'event_end_date'=>$eventEndDate,
            'event_start_time'=>$eventStartTime,
            'event_end_time'=>$eventEndTime
        ];
    }
}