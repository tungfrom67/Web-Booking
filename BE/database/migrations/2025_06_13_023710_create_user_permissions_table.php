<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_permissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->notNullable();
            $table->unsignedBigInteger('permission_id')->notNullable();
            $table->unsignedBigInteger('granted_by')->nullable();
            $table->timestamp('granted_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('expires_at')->nullable();
            $table->unique(['user_id', 'permission_id'], 'unique_user_permission');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('restrict');
            $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('restrict');
            $table->foreign('granted_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_permissions');
    }
};
