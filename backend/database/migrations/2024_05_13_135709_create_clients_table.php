<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('firstname'); // Name of the client
            $table->string('lastname'); // Name of the client
            $table->string('email')->unique(); // Email address of the client, unique constraint
            $table->string('phone')->nullable(); // Phone number of the client, allowing null values
            $table->text('city')->nullable(); // Address of the client, allowing null values
            $table->text('address')->nullable(); // Address of the client, allowing null values
            $table->timestamps(); // Timestamps for created_at and updated_at columns
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
    
};
