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
        Schema::create('permits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resident_id')->constrained('residents');
            $table->enum('permit_type',['repairs']);//NOTE: di ko pa alam ano mga permit type so di pa to final
            $table->enum('permit_status',['active','expired']);
            $table->date('issue_date');
            $table->date('expiry_date');
            $table->date('application_date');
            // $table->text('documents');    LIST RAW TO NG MGA PATH NG DOCUMENTS EHH kaso di ko pa sure kung dapat lagay tooo
            $table->text('comments')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permits');
    }
};