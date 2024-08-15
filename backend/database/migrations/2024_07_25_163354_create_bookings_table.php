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

        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('user_id')->constrained('users');
            $table->foreignId('amenity_id')->constrained('amenities');
            $table->date('booking_date');
            $table->time('start_time');
            $table->time('end_time');

            //new fields
            $table->string('full_name');
            $table->string('email',400);
            $table->string('contact_number',15);
            $table->enum('booking_status', 
            ['for_approval','reserved','rejected','cancelled']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};