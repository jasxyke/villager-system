<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Bill;
use App\Models\Resident;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Faker\Factory as Faker;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $faker = Faker::create();

        //create resident user for testing
        $residentUser = User::create([
            'lastname'=>'Cortez',
            'firstname'=>'Jaspher Xyke',
            'middlename'=>'Mendones',
            'role_type'=>'home_owner',
            'email'=>'jasxyke23.jxc@gmail.com',
            'password'=>Hash::make('password'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09487834865',
            'picture_url' => Storage::disk('public')->url('default_img.jpg'),
            'picture_path' => 'default_img.jpg',
        ]);
        Resident::factory(['user_id'=>$residentUser->id])
            ->create();
            for ($i = 0; $i < 5; $i++) {
                $bill = Bill::create([
                    'resident_id' => $residentUser->id,
                    'amount' => 1000,
                    'due_date' => Carbon::now()->subMonths($i)->endOfMonth(),
                    'status' => $faker->randomElement(['paid', 'pending', 'overdue']),
                    'issue_date' => Carbon::now()->subMonths($i)->startOfMonth(),
                ]);

                // If the bill is marked as paid, create a corresponding transaction
                if ($bill->status == 'paid') {
                    Transaction::create([
                        'resident_id' => $residentUser->id,
                        'bill_id' => $bill->id,
                        'reference_number' => Transaction::generateUniqueReference(),
                        'amount' => $bill->amount,
                        // 'payment_method' => $faker->randomElement(['cash', 'gcash']),
                        'transaction_date' => Carbon::now()->subMonths($i)->endOfMonth(),
                    ]);
                }
            }
        

        $residentUser = User::create([
            'lastname'=>'Fabellon',
            'firstname'=>'Rydel',
            'middlename'=>'Fiedacan',
            'role_type'=>'home_owner',
            'email'=>'rydelfabellon@gmail.com',
            'password'=>Hash::make('password'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09309200555',
            'picture_url' => Storage::disk('public')->url('default_img.jpg'),
            'picture_path' => 'default_img.jpg',
        ]);

        $residentUser = User::create([
            'lastname'=>'Rebusquillo',
            'firstname'=>'John Rey',
            'middlename'=>'Kintao',
            'role_type'=>'home_owner',
            'email'=>'rey@gmail.com',
            'password'=>Hash::make('password'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09109912324',
            'picture_url' => Storage::disk('public')->url('default_img.jpg'),
            'picture_path' => 'default_img.jpg',
        ]);

        Resident::factory(['user_id'=>$residentUser->id])
            ->create();

        //create admin user for testing
        $adminUser = User::create([
            'lastname'=>'Cortez',
            'firstname'=>'Jaspher Admin',
            'middlename'=>'Mendones',
            'role_type'=>'admin',
            'email'=>'xykeljas23.jxc@gmail.com',
            'password'=>Hash::make('password'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09487834865',
            'picture_url' => Storage::disk('public')->url('default_img.jpg'),
            'picture_path' => 'default_img.jpg',
        ]);

        Admin::create([
            'user_id'=>$adminUser->id
        ]);

        $adminUser = User::create([
            'lastname'=>'Fabellon',
            'firstname'=>'Rydel',
            'middlename'=>'Fiedacan',
            'role_type'=>'admin',
            'email'=>'fabellonrydel@gmail.com',
            'password'=>Hash::make('password'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09309200555',
            'picture_url' => Storage::disk('public')->url('default_img.jpg'),
            'picture_path' => 'default_img.jpg',
        ]);
        
        $adminUser = User::create([
            'lastname'=>'Rebusquillo',
            'firstname'=>'John Admin',
            'middlename'=>'Mendones',
            'role_type'=>'admin',
            'email'=>'jrey@gmail.com',
            'password'=>Hash::make('password'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09109912324',
            'picture_url' => Storage::disk('public')->url('default_img.jpg'),
            'picture_path' => 'default_img.jpg',
        ]);

        Admin::create([
            'user_id'=>$adminUser->id
        ]);
    }
}