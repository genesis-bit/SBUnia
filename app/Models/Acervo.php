<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Acervo extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'titulo',
        'ator',
        'editora',
        'ano_edicao',
        'categoria_id',
        'tipo_acervo_id',
        'observacao',
    ];

    /**
     * Relação com o modelo Categoria (um acervo pertence a uma categoria).
     */
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    /**
     * Relação com o modelo TipoAcervo (um acervo pertence a um tipo de acervo).
     */
    public function tipoAcervo()
    {
        return $this->belongsTo(TipoAcervo::class);
    }
}
