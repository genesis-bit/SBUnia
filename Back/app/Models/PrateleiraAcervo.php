<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PrateleiraAcervo extends Model
{
    use HasFactory;
    use SoftDeletes;
    
        protected $fillable = [
            'prateleira_id',
            'acervo_id',
            'quantidadeAcervos',
            'posicao1',
            'posicao2',
            'bibliotecario_id',
        ];
    
        /**
         * Relação com o modelo Prateleira (uma prateleira pode ter vários acervos).
         */
        public function prateleira()
        {
            return $this->belongsTo(Prateleira::class);
        }
    
        /**
         * Relação com o modelo Acervo (um acervo está em uma prateleira).
         */
        public function acervo()
        {
            return $this->belongsTo(Acervo::class);
        }
    
        /**
         * Relação com o modelo Bibliotecario (um bibliotecário é responsável pela prateleira_acervo).
         */
        public function bibliotecario()
        {
            return $this->belongsTo(Bibliotecario::class);
        }
    }
    