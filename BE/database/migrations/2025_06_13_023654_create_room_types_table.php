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
        Schema::create('room_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->notNullable();
            $table->string('slug', 255)->unique()->notNullable()->index('idx_slug');
            $table->text('description')->nullable();
            $table->integer('max_occupancy')->notNullable()->default(2);
            $table->string('bed_configuration', 255)->nullable();
            $table->integer('size_sqm')->nullable();
            $table->boolean('is_active')->default(true)->index('idx_active');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_types');
    }
};
