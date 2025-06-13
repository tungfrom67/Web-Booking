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
        Schema::create('flash_deals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('promotion_id')->constrained('promotions')->onDelete('cascade');
            $table->foreignId('hotel_id')->nullable()->constrained('hotels')->onDelete('set null');
            $table->foreignId('room_id')->nullable()->constrained('rooms')->onDelete('set null');
            $table->decimal('original_price', 12, 2)->notNullable();
            $table->decimal('deal_price', 12, 2)->notNullable();
            $table->integer('quantity_available')->notNullable();
            $table->integer('quantity_sold')->default(0);
            $table->timestamp('deal_start')->notNullable();
            $table->timestamp('deal_end')->notNullable();
            $table->timestamps();
            $table->index(['deal_start', 'deal_end'], 'idx_dates');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flash_deals');
    }
};
