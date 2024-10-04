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
    public function acervo()
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

    /**
     * Relação com o modelo Bibliotecario (um empréstimo é gerido por um bibliotecário).
     */
    public function bibliotecario()
    {
        return $this->belongsTo(Bibliotecario::class);
    }
}

