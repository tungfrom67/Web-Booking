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
        Schema::create('static_pages', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255)->notNullable();
            $table->string('slug', 255)->unique()->notNullable()->index('idx_slug');
            $table->longText('content')->nullable();
            $table->text('excerpt')->nullable();
            $table->string('meta_title', 255)->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->foreignId('featured_image_id')->nullable()->constrained('media_files')->onDelete('set null');
            $table->string('template', 100)->default('default');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->index('idx_status');
            $table->boolean('is_featured')->default(false)->index('idx_featured');
            $table->timestamp('published_at')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('restrict');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('static_pages');
    }
};
