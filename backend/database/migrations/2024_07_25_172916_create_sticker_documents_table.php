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
            $table->foreignId('car_sticker_request_id')->constrained('car_sticker_requests');
            $table->string('description',200);
            $table->string('document_path',1000);
            $table->string('document_url',2083);
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