<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Emprestimo extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'acervo_id',
        'cliente_id',
        'bibliotecario_id',
        'dataPrevistaEntrega',
    ];

    /**
     * Relação com o modelo PrateleiraAcervo (um empréstimo pertence a um acervo em uma prateleira).
     */
    public function prateleiraDetalhes()
    {
        return $this->belongsTo(PrateleiraAcervo::class, 'acervo_id', 'id');
    }

    /**
     * Relação com o modelo Cliente (um empréstimo pertence a um cliente).
     */
    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
    public function acervo()
    {
        return $this->hasOneThrough(
            Acervo::class,
            PrateleiraAcervo::class,
            'id',         // Chave estrangeira no PrateleiraAcervo
            'id',         // Chave estrangeira no Acervo
            'acervo_id',  // Chave local em Emprestimo
            'acervo_id'   // Chave local em PrateleiraAcervo
        );
    }

    /**
     * Relação com o modelo Bibliotecario (um empréstimo é gerido por um bibliotecário).
     */
    public function bibliotecario()
    {
        return $this->belongsTo(Bibliotecario::class);
    }
    public function devolucao()
    {
        return $this->belongsTo(Devolucao::class,'id','id');
    }
}

