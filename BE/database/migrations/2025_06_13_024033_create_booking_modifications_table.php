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
        Schema::create('booking_modifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
            $table->enum('modification_type', ['dates', 'rooms', 'guests', 'services'])->notNullable()->index('idx_type');
            $table->json('old_data')->notNullable();
            $table->json('new_data')->notNullable();
            $table->decimal('price_difference', 12, 2)->default(0);
            $table->text('reason')->nullable();
            $table->foreignId('requested_by')->constrained('users')->onDelete('restrict');
            $table->timestamp('requested_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->foreignId('processed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('processed_at')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending')->index('idx_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_modifications');
    }
};
