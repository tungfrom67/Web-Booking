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
        Schema::create('blog_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->notNullable()->comment('Tên danh mục blog');
            $table->string('slug', 255)->unique()->notNullable()->index('idx_slug')->comment('Đường dẫn thân thiện với SEO');
            $table->text('description')->nullable()->comment('Mô tả chi tiết về danh mục');
            $table->boolean('is_active')->default(true)->index('idx_active')->comment('Trạng thái hoạt động của danh mục');
            $table->timestamps();
            $table->softDeletes()->comment('Thời điểm xóa mềm');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_categories');
    }
};
