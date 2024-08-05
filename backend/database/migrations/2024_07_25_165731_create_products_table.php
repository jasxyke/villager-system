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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained('stores');//kung saang store sya nakalagay
            $table->foreignId('resident_id')->constrained('residents');//kung saang store sya nakalagay
            $table->string('name', 100);
            $table->text('description');
            $table->decimal('price', 8, 2);
            $table->smallInteger('quantity');
            $table->string('picture_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};