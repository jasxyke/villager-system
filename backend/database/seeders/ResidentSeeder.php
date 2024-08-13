<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\Comment;
use App\Models\Feedback;
use App\Models\House;
use App\Models\Product;
use App\Models\Resident;
use App\Models\Store;
use App\Models\Transaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResidentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        //generate residents from the same houses
        House::factory(25)
        ->has(Resident::factory(4))
        ->create();
        
        //generate residents with bills and their corresponding
        //transactions
        Resident::factory(5)
        ->create()
        ->each(function ($resident){
                Bill::factory(5)
                        ->state([
                                'resident_id'=>$resident->id,
                        ])
                        ->has(Transaction::factory(2)->state([
                                'resident_id'=>$resident->id
                        ]))->create();
        });

        
        //generate 5 residents with a 1 store each that has
        //5 products for each store
        Resident::factory(5)
        ->create()
        ->each(function ($resident){
                Store::factory(1)
                        ->state(['resident_id'=>$resident->id])
                        ->has(Product::factory(5)
                                ->state(['resident_id'=>$resident->id])
                                ->has(Comment::factory(5)))
                ->create();
        });

        //generate 5 residents with 2 feedbacks
        //Feedback::factory(5)->create();
        Resident::factory(5)
        ->create()
        ->each(function ($resident){
                Feedback::factory(3)
                        ->state([
                                'resident_id'=>$resident->id
                        ])->create();
        });
    }
}