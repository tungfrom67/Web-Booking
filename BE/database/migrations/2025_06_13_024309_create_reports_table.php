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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->notNullable();
            $table->enum('type', ['revenue', 'booking', 'customer', 'hotel', 'custom'])->notNullable()->index('idx_type');
            $table->enum('period', ['daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'custom'])->notNullable();
            $table->date('start_date')->notNullable();
            $table->date('end_date')->notNullable();
            $table->json('filters')->nullable();
            $table->json('data')->nullable();
            $table->string('file_path', 255)->nullable();
            $table->enum('status', ['generating', 'completed', 'failed'])->default('generating')->index('idx_status');
            $table->foreignId('created_by')->constrained('users')->onDelete('restrict');
            $table->timestamps();
            $table->index(['start_date', 'end_date'], 'idx_dates');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
