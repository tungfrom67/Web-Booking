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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 100)->notNullable();
            $table->string('last_name', 100)->notNullable();
            $table->string('email', 255)->unique()->notNullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 255)->notNullable();
            $table->string('phone', 20)->nullable()->index('idx_phone');
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('nationality', 100)->nullable();
            $table->text('address')->nullable();
            $table->string('avatar', 255)->nullable();
            $table->enum('user_type', ['admin', 'manager', 'staff', 'customer', 'partner'])->default('customer')->index('idx_user_type');
            $table->enum('status', ['active', 'inactive', 'suspended', 'banned'])->default('active')->index('idx_status');
            $table->boolean('is_vip')->default(false);
            $table->string('language', 10)->default('vi');
            $table->string('timezone', 50)->default('Asia/Ho_Chi_Minh');
            $table->timestamp('last_login_at')->nullable();
            $table->integer('login_count')->default(0);
            $table->string('remember_token', 100)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
