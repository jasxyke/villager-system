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
        Schema::create('sticker_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sticker_id')->constrained('car_stickers');
            $table->string('document_type');
            $table->text('document_path');
            $table->date('upload_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sticker_documents');
    }
};