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
        Schema::create('amenities', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->boolean('is_per_group');
            $table->decimal("day_price", 6, 2)->nullable();
            $table->decimal("night_price", 6,2)->nullable();
            $table->decimal("day_per_person_price")->nullable();
            $table->decimal("night_per_person_price")->nullable();
            $table->decimal("guest_additional_price", 6,2)->nullable();
            $table->decimal("extension_price", 6,2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('amenities');
    }
};