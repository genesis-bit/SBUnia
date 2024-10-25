<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'nome',
        'bilhete',
        'ndi',
        'telefone',
        'genero_id',
        'tipo_cliente_id',
        'universidade_id',
        'curso_id',
    ];

    /**
     * Relação com o modelo User (um cliente pertence a um usuário).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relação com o modelo TipoCliente (um cliente pertence a um tipo de cliente).
     */
    public function tipoCliente()
    {
        return $this->belongsTo(TipoCliente::class);
    }

    /**
     * Relação com o modelo Genero (um cliente pertence a um gênero).
     */
    public function genero()
    {
        return $this->belongsTo(Genero::class);
    }

    /**
     * Relação com o modelo Universidade (um cliente pertence a uma universidade - opcional).
     */
    public function universidade()
    {
        return $this->belongsTo(Universidade::class);
    }

    /**
     * Relação com o modelo Curso (um cliente pertence a um curso - opcional).
     */
    public function curso()
    {
        return $this->belongsTo(Curso::class);
    }
}
