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
        Schema::create('bibliotecarios', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->string('nome',50);
            $table->string('bilhete',20)->unique();
            $table->string('ndi',20)->unique();
            $table->string('telefone', 30)->nullable();
            $table->unsignedBigInteger('genero_id');
            $table->foreign('genero_id')->references('id')->on('generos');
            $table->foreign('id')->references('id')->on('users');
            $table->primary('id');
            $table->softDeletes('deleted_at', precision: 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bibliotecarios');
    }
};
