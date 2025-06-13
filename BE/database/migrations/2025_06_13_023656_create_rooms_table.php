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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained('hotels')->onDelete('restrict');
            $table->foreignId('room_type_id')->constrained('room_types')->onDelete('restrict');
            $table->string('name', 255)->notNullable();
            $table->string('slug', 255)->notNullable();
            $table->text('description')->nullable();
            $table->string('room_number', 50)->nullable();
            $table->integer('floor_number')->nullable();
            $table->integer('size_sqm')->nullable();
            $table->integer('max_occupancy')->notNullable()->default(2);
            $table->string('bed_configuration', 255)->nullable();
            $table->decimal('base_price', 12, 2)->notNullable()->index('idx_price');
            $table->decimal('weekend_price', 12, 2)->nullable();
            $table->decimal('holiday_price', 12, 2)->nullable();
            $table->decimal('discount_percentage', 5, 2)->default(0);
            $table->boolean('is_featured')->default(false)->index('idx_featured');
            $table->boolean('is_active')->default(true);
            $table->enum('status', ['available', 'occupied', 'maintenance', 'out_of_order'])->default('available')->index('idx_status');
            $table->timestamps();
            $table->unique(['hotel_id', 'slug'], 'unique_hotel_slug');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
