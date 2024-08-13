<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('residents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('house_id')->constrained('houses');
            $table->date('birthdate');
            $table->enum('sex',['male','female']);
            $table->enum('civil_status',['single', 'married', 'separated', 'divorced', 'widowed']);
            $table->enum('occupation_status',['self employed', 'employee', 'student', 'unemployed', 'others']);
            $table->string('fb_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};