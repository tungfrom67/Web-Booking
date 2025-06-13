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
        Schema::create('installment_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('installment_payment_id')->constrained('installment_payments')->onDelete('cascade');
            $table->integer('installment_number')->notNullable();
            $table->decimal('amount', 12, 2)->notNullable();
            $table->date('due_date')->notNullable()->index('idx_due_date');
            $table->date('paid_date')->nullable();
            $table->foreignId('transaction_id')->nullable()->constrained('payment_transactions')->onDelete('set null');
            $table->enum('status', ['pending', 'paid', 'overdue', 'waived'])->default('pending')->index('idx_status');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('installment_details');
    }
};
