<?php

namespace Database\Factories;

use App\Models\House;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email' => fake()->unique()->safeEmail(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
            'lastname'=>fake()->lastName(),
            'firstname'=>fake()->firstName(),
            'middlename'=>fake()->lastName(),
            'role_type'=>'resident',
            'contact_number'=>'09487834862',
            'picture_url' => Storage::disk('public')->url('default_img.jpg'),
            'picture_path' => 'default_img.jpg',
        ];
    }
    //the role type of the user is a resident
    public function resident(): Factory{
        return $this->state(function (array $attributes){
            return [
                'role_type'=>'resident'
            ];
        });
    }

    public function tenant(): Factory{
        return $this->state(function (array $attributes){
            return [
                'role_type'=>'tenant'
            ];
        });
    }

    public function admin(): Factory{
        return $this->state(function (array $attributes){
            return [
                'role_type'=>'admin'
            ];
        });
    }

    public function treasurer(): Factory{
        return $this->state(function (array $attributes){
            return [
                'role_type'=>'treasurer'
            ];
        });
    }

    public function homeOwner(): Factory{
        return $this->state(function (array $attributes){
            return [
                'role_type'=>'home_owner'
            ];
        });
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    // public function unverified(): static
    // {
    //     return $this->state(fn (array $attributes) => [
    //         'email_verified_at' => null,
    //     ]);
    // }
}