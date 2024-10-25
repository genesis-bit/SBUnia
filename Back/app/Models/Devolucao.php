<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Devolucao extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $primaryKey = 'id'; // Define 'id' como a chave primária
    public $incrementing = false; // A chave primária não é auto-incrementada
    protected $fillable = [
        'id',
        'bibliotecario_id',
        'observacao',
    ];

    /**
     * Relação com o modelo Emprestimo (uma devolução refere-se a um empréstimo).
     */
    public function emprestimo()
    {
        return $this->belongsTo(Emprestimo::class, 'id', 'id'); // Chave estrangeira 'id' se refere a 'id' na tabela 'emprestimos'
    }

    /**
     * Relação com o modelo Bibliotecario (uma devolução é registrada por um bibliotecário).
     */
    public function bibliotecario()
    {
        return $this->belongsTo(Bibliotecario::class);
    }
}

