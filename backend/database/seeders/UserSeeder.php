<?php

namespace Database\Seeders;

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
            'password'=>Hash::make('pasword'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09487834865'
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
            'password'=>Hash::make('pasword'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09487834865'
        ]);

        Resident::factory(['user_id'=>$adminUser->id])
            ->create();

        //create guest user for testing
        User::factory([
            'lastname'=>'Cortez',
            'firstname'=>'Jaspher Guest',
            'middlename'=>'Mendones',
            'role_type'=>'guest',
            'email'=>'jasxyke.jxc@gmail.com',
            'password'=>Hash::make('pasword'),
            'remember_token'=>Str::random(10),
            'contact_number'=>'09487834865'
        ])->create();
    }
}