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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255)->notNullable();
            $table->text('message')->notNullable();
            $table->enum('type', ['info', 'success', 'warning', 'error', 'promotion', 'booking', 'payment', 'review'])->default('info')->index('idx_type');
            $table->enum('priority', ['low', 'normal', 'high', 'urgent'])->default('normal');
            $table->enum('target_audience', ['all', 'customers', 'staff', 'managers', 'admins', 'specific'])->default('all');
            $table->json('target_users')->nullable();
            $table->json('data')->nullable();
            $table->string('action_url', 255)->nullable();
            $table->string('action_text', 100)->nullable();
            $table->timestamp('scheduled_at')->nullable()->index('idx_scheduled');
            $table->timestamp('expires_at')->nullable();
            $table->enum('status', ['draft', 'scheduled', 'sent', 'failed'])->default('draft')->index('idx_status');
            $table->integer('sent_count')->default(0);
            $table->integer('read_count')->default(0);
            $table->integer('click_count')->default(0);
            $table->foreignId('created_by')->constrained('users')->onDelete('restrict');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
