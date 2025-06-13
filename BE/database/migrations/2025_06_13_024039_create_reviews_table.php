<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');
            $table->foreignId('hotel_id')->constrained('hotels')->onDelete('restrict');
            $table->foreignId('room_id')->nullable()->constrained('rooms')->onDelete('set null');
            $table->foreignId('booking_id')->nullable()->constrained('bookings')->onDelete('set null');
            $table->decimal('overall_rating', 2, 1)->notNullable()->index('idx_rating');
            $table->decimal('cleanliness_rating', 2, 1)->nullable();
            $table->decimal('service_rating', 2, 1)->nullable();
            $table->decimal('location_rating', 2, 1)->nullable();
            $table->decimal('value_rating', 2, 1)->nullable();
            $table->string('title', 255)->nullable();
            $table->text('comment')->nullable();
            $table->text('pros')->nullable();
            $table->text('cons')->nullable();
            $table->json('images')->nullable();
            $table->integer('helpful_count')->default(0);
            $table->integer('unhelpful_count')->default(0);
            $table->enum('status', ['pending', 'approved', 'rejected', 'hidden'])->default('pending')->index('idx_status');
            $table->timestamp('reviewed_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->index(['hotel_id', 'status'], 'idx_hotel_status');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
