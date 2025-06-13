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
        Schema::create('amenities', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->notNullable();
            $table->string('slug', 255)->unique()->notNullable();
            $table->text('description')->nullable();
            $table->string('icon', 255)->nullable();
            $table->enum('category', ['hotel', 'room', 'both'])->notNullable()->default('both')->index('idx_category');
            $table->enum('type', ['basic', 'premium', 'luxury'])->default('basic')->index('idx_type');
            $table->boolean('is_active')->default(true)->index('idx_active');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('amenities');
    }
};
