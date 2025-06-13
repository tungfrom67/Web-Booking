<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_id')->constrained('countries')->onDelete('restrict');
            $table->string('name', 255)->notNullable();
            $table->string('slug', 255)->notNullable();
            $table->text('description')->nullable();
            $table->string('image_url', 255)->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->boolean('is_featured')->default(false)->index('idx_featured');
            $table->boolean('is_active')->default(true)->index('idx_active');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
            $table->unique(['country_id', 'slug'], 'unique_country_slug');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
