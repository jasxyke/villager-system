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
        Schema::create('household_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('house_id')->constrained('houses')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('granted_by')->constrained('users')->onDelete('cascade'); // Home owner ID

            $table->enum('permission_type', ['view-monthly-dues','create-bookings', 
            'send-complaints', 'get-car-sticker', 'request-clearance']); // Define types of permissions
            
            $table->timestamp('granted_at')->default(now());
            $table->timestamp('expires_at')->nullable(); // Optional: for temporary permissions
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('household_permissions');
    }
};