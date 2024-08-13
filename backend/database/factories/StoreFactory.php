<?php

namespace Database\Factories;

use App\Models\Resident;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Store>
 */
class StoreFactory extends Factory
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
            'store_name'=>$this->faker->word(),
            'store_address'=>$this->faker->address(),
            'picture_path'=>'default_img',
            'picture_url' =>Storage::disk('public')->url('default_img')
        ];
    }
}