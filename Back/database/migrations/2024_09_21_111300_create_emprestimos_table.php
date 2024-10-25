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
        Schema::create('emprestimos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('acervo_id');
            $table->unsignedBigInteger('cliente_id');
            $table->unsignedBigInteger('bibliotecario_id');
            $table->date('dataPrevistaEntrega');
            $table->foreign('acervo_id')->references('acervo_id')->on('prateleira_acervos');
            $table->foreign('cliente_id')->references('id')->on('clientes');
            $table->foreign('bibliotecario_id')->references('id')->on('bibliotecarios');
            $table->softDeletes('deleted_at', precision: 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emprestimos');
    }
};
