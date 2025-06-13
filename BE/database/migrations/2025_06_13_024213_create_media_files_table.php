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
        Schema::create('media_files', function (Blueprint $table) {
            $table->id();
            $table->string('file_name', 255)->notNullable();
            $table->string('original_name', 255)->notNullable();
            $table->string('file_path', 255)->notNullable();
            $table->string('file_url', 255)->notNullable();
            $table->integer('file_size')->notNullable();
            $table->string('file_type', 100)->notNullable()->index('idx_file_type');
            $table->string('mime_type', 100)->notNullable();
            $table->string('dimensions', 50)->nullable();
            $table->string('alt_text', 255)->nullable();
            $table->text('description')->nullable();
            $table->foreignId('uploaded_by')->constrained('users')->onDelete('restrict');
            $table->string('folder', 255)->default('uploads')->index('idx_folder');
            $table->boolean('is_public')->default(true)->index('idx_public');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_files');
    }
};
