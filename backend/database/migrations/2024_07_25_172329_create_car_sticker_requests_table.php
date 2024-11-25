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
        Schema::create('car_sticker_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resident_id')->constrained('residents');
            $table->string('car_model');
            $table->string('car_plate_number');
            $table->enum('request_status',['pending','approved',
            'rejected','in_progress','completed', 'claimed']);
            $table->date('application_date');
            $table->date('approval_date')->nullable();
            $table->date('completed_date')->nullable();
            $table->date('claimed_date')->nullable();
            $table->decimal('sticker_fee')->nullable();
            $table->decimal('processing_fee')->nullable();
            $table->enum('sticker_type', ['two-wheel', 'four-wheel', 'delivery truck']); // Add sticker_type
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_sticker_requests');
    }
};