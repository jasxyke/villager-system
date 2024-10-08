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
        Schema::create('permit_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resident_id')->constrained('residents');
            $table->string('purpose',300);
            $table->decimal('floor_size',8,2)->nullable()->default(0);
            $table->enum('permit_status', ['pending', 'to pay', 'rejected','to claim','claimed']); // Status of the permit request
            $table->decimal('processing_fee',6,2)->nullable();
            $table->decimal('permit_fee',6,2)->nullable();
            $table->date('application_date')->nullable(); // Date the request was made
            $table->date('approval_date')->nullable(); // Date the request was approved, if applicable
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permit_requests');
    }
};
