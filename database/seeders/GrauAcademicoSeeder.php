<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GrauAcademicoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('grau_academicos')->insert([
            'descricao' => 'Licenciado'
        ]);
        DB::table('grau_academicos')->insert([
            'descricao' => 'Mestre'
        ]);
        DB::table('grau_academicos')->insert([
            'descricao' => 'Doutor'
        ]);
        DB::table('grau_academicos')->insert([
            'descricao' => 'Catedratico'
        ]);
    }
}
