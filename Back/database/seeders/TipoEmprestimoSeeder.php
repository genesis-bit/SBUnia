<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoEmprestimoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipo_emprestimos')->insert([
            'descricao' => 'Solicitação'
        ]);
        DB::table('tipo_emprestimos')->insert([
            'descricao' => 'Emprestimo'
        ]);
    }
}
