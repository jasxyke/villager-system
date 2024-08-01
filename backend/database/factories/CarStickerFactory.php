<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarSticker>
 */
class CarStickerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'car_model'=>'Honda',
            'car_plate_number'=>$this->faker->randomNumber(6),
            'issue_date'=>$this->faker->date(),
            'expiry_date'=>$this->faker->date(),
            'application_date'=>$this->faker->date(),
            'comments'=>$this->faker->sentence(15)
        ];
    }
}