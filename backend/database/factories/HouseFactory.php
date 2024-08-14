<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\House>
 */
class HouseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $block = $this->faker->numberBetween(1,10);
        $lot = $this->faker->numberBetween(1,100);
        $houseType = $this->faker->randomElement(['residential','business']);
        return [
            'block'=> $block,
            'lot'=> $lot,
            'house_type' => $houseType
        ];
    }
}
