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
            $table->unsignedBigInteger('calories_user_id');
            $table->integer('proteins_consumed');
            $table->integer('fats_consumed');
            $table->integer('carbs_consumed');
            $table->integer('calories_consumed');
            $table->timestamps();

            $table->foreign('calories_user_id')->references('id')->on('calories_users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('macros_consumeds');
    }
}
