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
        Schema::create('installment_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');
            $table->decimal('total_amount', 12, 2)->notNullable();
            $table->integer('installment_count')->notNullable();
            $table->decimal('installment_amount', 12, 2)->notNullable();
            $table->integer('paid_installments')->default(0);
            $table->date('next_payment_date')->notNullable()->index('idx_next_payment');
            $table->enum('status', ['active', 'completed', 'defaulted', 'cancelled'])->default('active')->index('idx_status');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('installment_payments');
    }
};
