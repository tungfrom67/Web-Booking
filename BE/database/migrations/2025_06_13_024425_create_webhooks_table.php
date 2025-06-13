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
        Schema::create('webhooks', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->notNullable();
            $table->string('url', 255)->notNullable();
            $table->enum('event', ['booking_created', 'booking_updated', 'booking_cancelled', 'payment_processed'])->notNullable()->index('idx_event');
            $table->string('secret', 255)->nullable();
            $table->enum('status', ['active', 'inactive', 'error'])->default('active')->index('idx_status');
            $table->foreignId('created_by')->constrained('users')->onDelete('restrict');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('webhooks');
    }
};
