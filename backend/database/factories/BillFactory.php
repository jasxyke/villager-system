<?php

namespace Database\Factories;

use App\Models\Resident;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bill>
 */
class BillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'resident_id'=>Resident::factory(),
            'amount'=>$this->faker->randomNumber(4),
            'due_date'=>$this->faker->date(),
            'issue_date'=>$this->faker->date(),
        ];
    }
}