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
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->notNullable();
            $table->string('code', 10)->unique()->notNullable()->index('idx_code');
            $table->string('currency', 10)->notNullable()->default('VND');
            $table->string('timezone', 50)->notNullable()->default('Asia/Ho_Chi_Minh');
            $table->string('flag_url', 255)->nullable();
            $table->boolean('is_active')->default(true)->index('idx_active');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};
