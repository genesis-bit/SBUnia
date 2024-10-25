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
        Schema::create('prateleira_acervos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('prateleira_id');
            $table->unsignedBigInteger('acervo_id');
            $table->Integer('quantidadeAcervos');
            $table->string('posicao1', 30);
            $table->string('posicao2',30)->nullable();
            $table->unsignedBigInteger('bibliotecario_id');
            $table->foreign('bibliotecario_id')->references('id')->on('bibliotecarios');
            $table->foreign('acervo_id')->references('id')->on('acervos');
            $table->foreign('prateleira_id')->references('id')->on('prateleiras');
            $table->softDeletes('deleted_at', precision: 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prateleira_acervos');
    }
};
