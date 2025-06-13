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
        Schema::create('banners', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255)->notNullable();
            $table->text('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->foreignId('image_id')->constrained('media_files')->onDelete('cascade');
            $table->string('link_url', 255)->nullable();
            $table->string('link_text', 100)->nullable();
            $table->enum('position', ['home_hero', 'home_secondary', 'category', 'sidebar', 'footer'])->default('home_hero')->index('idx_position');
            $table->enum('target_audience', ['all', 'new_users', 'returning_users', 'vip_users'])->default('all');
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->boolean('is_active')->default(true)->index('idx_active');
            $table->integer('click_count')->default(0);
            $table->integer('impression_count')->default(0);
            $table->integer('sort_order')->default(0);
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
        Schema::dropIfExists('banners');
    }
};
