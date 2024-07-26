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
        Schema::create('permit_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('permit_id')->constrained('permits');
            $table->string('document_type');//TODO: convert mo to to ENUM once makuha mo yung more info about these
            $table->string('document_path');
            $table->date('upload_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permit_documents');
    }
};