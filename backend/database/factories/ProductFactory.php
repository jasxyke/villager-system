<?php

namespace Database\Factories;

use App\Models\Resident;
use App\Models\Store;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
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
            'store_id'=>Store::factory(),
            'name'=>$this->faker->word(),
            'description'=>$this->faker->sentence(),
            'price'=>$this->faker->randomNumber(5),
            'quantity'=>$this->faker->numberBetween(0,20),
            'picture_path'=>'default_img.jpg',
            'picture_url' => Storage::disk('public')->url('default_img.jpg'),
        ];
    } 
}