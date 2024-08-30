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
            $table->foreignId('permit_request_id')->constrained('permit_requests');
            $table->string('description',1000);//TODO: convert mo to to ENUM once makuha mo yung more info about these
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
        Schema::dropIfExists('permit_documents');
    }
};