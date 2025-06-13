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
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255)->notNullable();
            $table->string('slug', 255)->unique()->notNullable()->index('idx_slug');
            $table->longText('content')->notNullable();
            $table->text('excerpt')->nullable();
            $table->foreignId('featured_image_id')->nullable()->constrained('media_files')->onDelete('set null');
            $table->foreignId('category_id')->nullable()->constrained('blog_categories')->onDelete('set null'); // Thay đổi này
            $table->foreignId('author_id')->constrained('users')->onDelete('restrict');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft')->index('idx_status');
            $table->boolean('is_featured')->default(false)->index('idx_featured');
            $table->integer('view_count')->default(0);
            $table->integer('like_count')->default(0);
            $table->integer('comment_count')->default(0);
            $table->string('meta_title', 255)->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->timestamp('published_at')->nullable()->index('idx_published');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
