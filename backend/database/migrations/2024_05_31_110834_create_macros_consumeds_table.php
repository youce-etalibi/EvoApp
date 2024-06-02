<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMacrosConsumedsTable extends Migration
{
    public function up()
    {
        Schema::create('macros_consumeds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('calories_user_id')->constrained('calories_users')->onDelete('cascade');
            $table->float('proteins_consumed');
            $table->float('fats_consumed');
            $table->float('carbs_consumed');
            $table->float('calories_consumed'); 
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('macros_consumeds');
    }
}
