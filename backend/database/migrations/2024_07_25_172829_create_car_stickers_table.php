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
        Schema::create('car_stickers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resident_id')->constrained('residents');
            $table->string('car_model');
            $table->string('car_plate_number');
            $table->enum('sticker_status',['active','expired']);
            $table->date('issue_date');
            $table->date('expiry_date');
            $table->date('application_date');
            $table->text('comments')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_stickers');
    }
};