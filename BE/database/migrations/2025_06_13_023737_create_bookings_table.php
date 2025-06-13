<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_number', 50)->unique()->notNullable()->index('idx_booking_number');
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');
            $table->foreignId('hotel_id')->constrained('hotels')->onDelete('restrict');
            $table->date('check_in_date')->notNullable();
            $table->date('check_out_date')->notNullable();
            $table->integer('nights')->notNullable();
            $table->integer('adults')->notNullable()->default(1);
            $table->integer('children')->notNullable()->default(0);
            $table->string('guest_name', 255)->notNullable();
            $table->string('guest_email', 255)->notNullable()->index('idx_guest_email');
            $table->string('guest_phone', 20)->notNullable();
            $table->text('special_requests')->nullable();
            $table->decimal('room_total', 12, 2)->notNullable()->default(0);
            $table->decimal('service_total', 12, 2)->notNullable()->default(0);
            $table->decimal('tax_amount', 12, 2)->notNullable()->default(0);
            $table->decimal('discount_amount', 12, 2)->notNullable()->default(0);
            $table->decimal('total_amount', 12, 2)->notNullable();
            $table->string('currency', 10)->default('VND');
            $table->foreignId('promotion_id')->nullable()->constrained('promotions')->onDelete('set null');
            $table->enum('status', ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show'])->default('pending')->index('idx_status');
            $table->enum('payment_status', ['pending', 'paid', 'partially_paid', 'refunded', 'failed'])->default('pending')->index('idx_payment_status');
            $table->text('cancellation_reason')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->foreignId('cancelled_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('confirmed_at')->nullable();
            $table->foreignId('confirmed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('checked_in_at')->nullable();
            $table->timestamp('checked_out_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['check_in_date', 'check_out_date'], 'idx_dates');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
