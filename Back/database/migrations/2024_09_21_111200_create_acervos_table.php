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
        Schema::create('acervos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo', 50);
            $table->string('ator', 60);
            $table->string('editora', 60);
            $table->year('ano_edicao');
            $table->unsignedBigInteger('categoria_id');
            $table->unsignedBigInteger('tipo_acervo_id');
            $table->text('observacao')->nullable();
            $table->foreign('tipo_acervo_id')->references('id')->on('tipo_acervos');
            $table->foreign('categoria_id')->references('id')->on('categorias');
            $table->softDeletes('deleted_at', precision: 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acervos');
    }
};
