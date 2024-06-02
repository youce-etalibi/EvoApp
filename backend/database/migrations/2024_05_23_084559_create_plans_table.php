<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 8, 2);
            $table->text('description')->nullable();
            $table->foreignId('plan_type_id')->references('id')->on('plan_types')->onDelete('cascade');
            $table->timestamps();
        });
    }

  
    public function down()
    {
        Schema::dropIfExists('plans');
    }
};
