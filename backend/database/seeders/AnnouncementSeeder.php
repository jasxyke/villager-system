<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Announcement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::factory()
                ->count(2)
                ->has(Announcement::factory()->count(20))
                ->create();
    }
}