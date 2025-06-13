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
        Schema::create('additional_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained('hotels')->onDelete('cascade');
            $table->string('name', 255)->notNullable();
            $table->text('description')->nullable();
            $table->decimal('price', 12, 2)->notNullable();
            $table->string('unit', 50)->default('item');
            $table->enum('category', ['food', 'transport', 'spa', 'tour', 'other'])->default('other')->index('idx_category');
            $table->boolean('is_active')->default(true)->index('idx_active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('additional_services');
    }
};
