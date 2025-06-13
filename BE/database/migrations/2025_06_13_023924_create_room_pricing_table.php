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
        Schema::create('room_pricing', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained('rooms')->onDelete('cascade');
            $table->date('date')->notNullable()->index('idx_date');
            $table->decimal('base_price', 12, 2)->notNullable();
            $table->decimal('weekend_price', 12, 2)->nullable();
            $table->decimal('holiday_price', 12, 2)->nullable();
            $table->decimal('discount_percentage', 5, 2)->default(0);
            $table->integer('min_stay')->default(1);
            $table->integer('max_stay')->nullable();
            $table->integer('available_rooms')->default(1);
            $table->enum('status', ['available', 'booked', 'blocked'])->default('available')->index('idx_status');
            $table->timestamps();
            $table->unique(['room_id', 'date'], 'unique_room_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('room_pricing');
    }
};
