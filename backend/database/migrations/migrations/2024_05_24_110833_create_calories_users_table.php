<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCaloriesUsersTable extends Migration
{
    public function up()
    {
        Schema::create('calories_users', function (Blueprint $table) {
            $table->id();
            $table->date('birthday');
            $table->integer('height');
            $table->integer('weight');
            $table->string('goal');
            $table->string('activity');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('calories_users');
    }
}
