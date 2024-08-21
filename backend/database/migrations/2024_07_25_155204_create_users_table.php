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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->char('password', 60);
            $table->string('lastname', 50);
            $table->string('firstname', 100);
            $table->string('middlename', 50)->nullable()->default('');
            $table->string('contact_number',20);
            $table->string('picture_url', 2083);
            $table->string('picture_path', 2083);
            $table->enum('role_type',['member','tenant','admin','treasurer','home_owner','seller']); // Example values: 'resident', 'admin', 'treasurer'
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};