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
        Schema::create('api_integrations', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->notNullable();
            $table->string('provider', 100)->notNullable()->index('idx_provider');
            $table->string('api_key', 255)->notNullable();
            $table->string('secret', 255)->nullable();
            $table->json('config')->nullable();
            $table->enum('status', ['active', 'inactive', 'error'])->default('active')->index('idx_status');
            $table->timestamp('last_sync_at')->nullable();
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
        Schema::dropIfExists('api_integrations');
    }
};
