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
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('nome',50);
            $table->string('bilhete',20)->unique();
            $table->string('ndi',20)->unique();
            $table->string('telefone', 30)->nullable();
            $table->unsignedBigInteger('genero_id');
            $table->unsignedBigInteger('tipo_cliente_id');
            $table->unsignedBigInteger('universidade_id')->nullable();
            $table->unsignedBigInteger('curso_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('tipo_cliente_id')->references('id')->on('tipo_clientes');
            $table->foreign('universidade_id')->references('id')->on('universidades');
            $table->foreign('genero_id')->references('id')->on('generos');
            $table->foreign('curso_id')->references('id')->on('cursos');
            $table->softDeletes('deleted_at', precision: 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
