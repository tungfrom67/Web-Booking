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
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->notNullable();
            $table->string('code', 100)->nullable()->unique()->index('idx_code');
            $table->text('description')->nullable();
            $table->enum('type', ['discount_code', 'special_offer', 'flash_deal', 'loyalty_reward'])->notNullable()->index('idx_type');
            $table->enum('discount_type', ['percentage', 'fixed_amount', 'free_night'])->notNullable();
            $table->decimal('discount_value', 12, 2)->notNullable();
            $table->decimal('min_order_amount', 12, 2)->nullable();
            $table->decimal('max_discount_amount', 12, 2)->nullable();
            $table->integer('usage_limit')->nullable();
            $table->integer('usage_count')->default(0);
            $table->integer('user_usage_limit')->default(1);
            $table->json('applicable_hotels')->nullable();
            $table->json('applicable_room_types')->nullable();
            $table->enum('user_type', ['all', 'new', 'vip', 'loyalty'])->default('all');
            $table->timestamp('start_date')->notNullable();
            $table->timestamp('end_date')->notNullable();
            $table->boolean('is_active')->default(true)->index('idx_active');
            $table->foreignId('created_by')->constrained('users')->onDelete('restrict');
            $table->timestamps();
            $table->softDeletes();
            $table->index(['start_date', 'end_date'], 'idx_dates');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};
