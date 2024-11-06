<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prateleira extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'descricao',
        'observacao'
    ];

    // Prateleira.php
    public function acervos()
    {
        return $this->belongsToMany(Acervo::class, 'prateleira_acervos')
            ->withPivot('quantidadeAcervos');
    }
}
