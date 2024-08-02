<?php

namespace Database\Factories;

use App\Models\Resident;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $block = $this->faker->randomNumber(2);
        $lot = $this->faker->randomNumber(3);
        return [
            'block'=> $block,
            'lot'=> $lot,
            'resident_id'=>Resident::factory()
        ];
    }
}