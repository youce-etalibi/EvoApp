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
        Schema::create('user_infos', function (Blueprint $table) {
            $table->id();
            $table->string('fullname');
            $table->foreignId('membre_id')->constrained('membres')->onDelete('cascade');
            $table->string('genre');
            $table->float('height');
            $table->float('weight');
            $table->string('profile')->nullable();
            $table->foreignId('goal_id')->constrained('goals');
            $table->float('fat')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_infos');
    }
};
