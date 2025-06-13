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
        Schema::create('payment_refunds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('original_transaction_id')->constrained('payment_transactions')->onDelete('cascade');
            $table->string('refund_transaction_id', 100)->unique()->notNullable()->index('idx_refund_id');
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
            $table->decimal('refund_amount', 12, 2)->notNullable();
            $table->text('refund_reason')->notNullable();
            $table->string('provider_refund_id', 255)->nullable();
            $table->json('provider_response')->nullable();
            $table->enum('status', ['pending', 'processing', 'completed', 'failed', 'rejected'])->default('pending')->index('idx_status');
            $table->foreignId('requested_by')->constrained('users')->onDelete('restrict');
            $table->foreignId('processed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('requested_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('processed_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_refunds');
    }
};
