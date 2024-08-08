<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Admin;
use App\Models\Resident;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //create resident user for testing
        $residentUser = User::create([
            'lastname'=>'Cortez',
            'firstname'=>'Jaspher Xyke',
            'middlename'=>'Mendones',
            'role_type'=>'resident',
            'email'=>'jasxyke23.jxc@gmail.com',
            'password'=>Hash::make('password'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09487834865'
        ]);
        Resident::factory(['user_id'=>$residentUser->id])
        ->has(Address::factory())
            ->create();

        $residentUser = User::create([
            'lastname'=>'Fabellon',
            'firstname'=>'Rydel',
            'middlename'=>'Fiedacan',
            'role_type'=>'resident',
            'email'=>'rydelfabellon@gmail.com',
            'password'=>Hash::make('password'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09309200555'
        ]);
        Resident::factory(['user_id'=>$residentUser->id])
        ->has(Address::factory())
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
            'contact_number'=>'09487834865'
        ]);

        $adminUser = User::create([
            'lastname'=>'Fabellon',
            'firstname'=>'Rydel',
            'middlename'=>'Fiedacan',
            'role_type'=>'admin',
            'email'=>'fabellonrydel@gmail.com',
            'password'=>Hash::make('password'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09309200555'
        ]);

        Resident::factory(['user_id'=>$adminUser->id])
        ->has(Address::factory())
            ->create();

        //create guest user for testing
        User::factory([
            'lastname'=>'Cortez',
            'firstname'=>'Jaspher Guest',
            'middlename'=>'Mendones',
            'role_type'=>'guest',
            'email'=>'jasxyke.jxc@gmail.com',
            'password'=>Hash::make('password'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09487834865'
        ])->create();

        User::factory([
            'lastname'=>'Fabellon',
            'firstname'=>'Rydel',
            'middlename'=>'Fiedacan',
            'role_type'=>'guest',
            'email'=>'rydelfabellon53@gmail.com',
            'password'=>Hash::make('password'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09309200555'
        ])->create();
    }
}