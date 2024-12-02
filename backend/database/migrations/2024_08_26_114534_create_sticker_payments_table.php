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
        Schema::create('sticker_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_sticker_request_id')->constrained('car_sticker_requests');
            $table->foreignId('resident_id')->constrained('residents');
            $table->decimal('amount', 10, 2);
            $table->date('payment_date');
            $table->enum('payment_status',['completed','cancelled']);
            //$table->enum('payment_method', ['Gcash', 'Cash']); // e.g., 'credit_card', 'bank_transfer'
            $table->text('transaction_id')->nullable(); // For tracking payment transaction ID
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sticker_payments');
    }
};