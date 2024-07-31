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
            $table->date('birthdate');
            $table->enum('sex',['male','female']);
            $table->foreignId('address_id')->constrained('address');
            $table->enum('civil_status',['single', 'married', 'separated', 'divorced', 'widowed']);
            $table->enum('occupation_status',['self employed', 'employee', 'student', 'unemployed', 'others']);
            $table->string('facebook_name');
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