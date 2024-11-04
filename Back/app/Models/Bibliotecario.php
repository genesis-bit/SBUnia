<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Bibliotecario extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $primaryKey = 'id'; // A chave primária é o campo 'id'
    public $incrementing = false; // O 'id' não é auto-incrementado (pois é uma chave estrangeira)
    protected $fillable = [
        'id',
        'nome',
        'bilhete',
        'ndi',
        'telefone',
        'genero_id',
        'foto'
    ];

    /**
     * Relação com o modelo User (um bibliotecário pertence a um usuário).
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'id'); // Chave estrangeira 'id' se refere a 'id' na tabela 'users'
    }

    /**
     * Relação com o modelo Genero (um bibliotecário pertence a um gênero).
     */
    public function genero()
    {
        return $this->belongsTo(Genero::class);
    }
}

