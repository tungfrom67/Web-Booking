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
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->notNullable();
            $table->string('slug', 255)->unique()->notNullable()->index('idx_slug');
            $table->foreignId('category_id')->constrained('hotel_categories')->onDelete('restrict');
            $table->foreignId('area_id')->constrained('areas')->onDelete('restrict');
            $table->foreignId('owner_id')->nullable()->constrained('users')->onDelete('set null');
            $table->enum('type', ['hotel', 'resort', 'apartment', 'villa', 'hostel', 'guesthouse', 'motel'])->notNullable()->index('idx_type');
            $table->text('address')->notNullable();
            $table->text('description')->nullable();
            $table->string('short_description', 500)->nullable();
            $table->decimal('star_rating', 2, 1)->nullable();
            $table->decimal('review_rating', 2, 1)->default(0)->index('idx_rating');
            $table->integer('review_count')->default(0);
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('email', 255)->nullable();
            $table->string('website', 255)->nullable();
            $table->time('check_in_time')->default('14:00:00');
            $table->time('check_out_time')->default('12:00:00');
            $table->integer('total_rooms')->default(0);
            $table->boolean('is_featured')->default(false)->index('idx_featured');
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_active')->default(true);
            $table->enum('status', ['active', 'inactive', 'pending', 'suspended'])->default('pending')->index('idx_status');
            $table->timestamps();
            $table->softDeletes();
            $table->index(['latitude', 'longitude'], 'idx_location');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};
