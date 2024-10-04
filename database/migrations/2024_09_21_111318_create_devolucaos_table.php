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
        Schema::create('devolucaos', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->unsignedBigInteger('bibliotecario_id');
            $table->text('observacao')->nullable();
            $table->foreign('bibliotecario_id')->references('id')->on('bibliotecarios');
            $table->foreign('id')->references('id')->on('emprestimos');
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
        Schema::dropIfExists('devolucaos');
    }
};
