<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Permit>
 */
class PermitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'permit_type'=>'repairs',
            'permit_status'=>'active',
            'issue_date'=>$this->faker->date(),
            'expiry_date'=>$this->faker->date(),
            'application_date'=>$this->faker->date(),
            'comments'=>$this->faker->text(150)
        ];
    }
}