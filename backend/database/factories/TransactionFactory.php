<?php

namespace Database\Factories;

use App\Models\Bill;
use App\Models\Resident;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
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
            'bill_id'=>Bill::factory(),
            'amount'=>$this->faker->randomNumber(4),
            'payment_method'=>'cash',
            'transaction_date'=>$this->faker->date()
        ];
    }
}