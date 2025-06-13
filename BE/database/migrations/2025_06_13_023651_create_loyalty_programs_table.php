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
        Schema::create('loyalty_programs', function (Blueprint $table) {
           $table->id();
            $table->string('name', 255)->notNullable();
            $table->string('tier_name', 100)->notNullable();
            $table->integer('min_points')->notNullable()->default(0);
            $table->integer('max_points')->nullable();
            $table->json('benefits')->nullable();
            $table->decimal('discount_percentage', 5, 2)->default(0);
            $table->decimal('point_multiplier', 3, 2)->default(1.0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loyalty_programs');
    }
};
