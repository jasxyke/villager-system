<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\House;
use App\Models\Resident;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
class HouseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $blocks = range(1, 10);
        $lots = range(1, 10);

        foreach ($blocks as $block) {
            foreach ($lots as $lot) {
                // Create a House
                $house = House::create([
                    'block' => $block,
                    'lot' => $lot,
                    'house_type' => $faker->randomElement(['residential', 'business', 'mixed']),
                ]);

                // Create a User associated with this house
                $user = User::create([
                    'email' => $faker->unique()->safeEmail,
                    'password' => Hash::make('password'), // default password
                    'lastname' => $faker->lastName,
                    'firstname' => $faker->firstName,
                    'middlename' => $faker->lastName,
                    'contact_number' => $faker->phoneNumber,
                    'role_type' => 'home_owner',
                ]);

                // Create a Resident associated with the user and house
                $resident = Resident::create([
                    'user_id' => $user->id,
                    'house_id' => $house->id,
                    'birthdate' => $faker->date('Y-m-d', '2000-01-01'),
                    'sex' => $faker->randomElement(['male', 'female']),
                    'civil_status' => $faker->randomElement(['single', 'married', 'separated', 'divorced', 'widowed']),
                    'occupation_status' => $faker->randomElement(['self employed', 'employee', 'student', 'unemployed', 'others']),
                    'fb_name' => $faker->userName,
                ]);

                // Create 5 bills for the resident over the last 5 months
                for ($i = 0; $i < 5; $i++) {
                    $bill = Bill::create([
                        'resident_id' => $resident->id,
                        'amount' => 1000,
                        'due_date' => Carbon::now()->subMonths($i)->endOfMonth(),
                        'status' => $faker->randomElement(['paid', 'unpaid', 'overdue']),
                        'issue_date' => Carbon::now()->subMonths($i)->startOfMonth(),
                    ]);

                    // If the bill is marked as paid, create a corresponding transaction
                    if ($bill->status == 'paid') {
                        Transaction::create([
                            'resident_id' => $resident->id,
                            'bill_id' => $bill->id,
                            'amount' => $bill->amount,
                            // 'payment_method' => $faker->randomElement(['cash', 'gcash']),
                            'transaction_date' => Carbon::now()->subMonths($i)->endOfMonth(),
                        ]);
                    }
                }
            }
        }
    }
}
