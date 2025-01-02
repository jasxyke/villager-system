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
            $table->foreignId('resident_id')->constrained('residents');
            $table->foreignId('amenity_id')->constrained('amenities');
            $table->date('booking_date');
            $table->time('start_time');
            $table->time('end_time');
            //new fields
            $table->string('full_name')->nullable();
            $table->string('email',400)->nullable();
            $table->string('contact_number',15)->nullable();
            $table->enum('booking_status', 
            ['for_approval','reserved','rejected','cancelled']);
            $table->enum('payment_status',['paid','partial','pending','failed'])->default('pending');
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