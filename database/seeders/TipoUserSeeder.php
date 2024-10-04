<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipo_users')->insert([
            'descricao' => 'Administrador'
        ]);
        DB::table('tipo_users')->insert([
            'descricao' => 'Bibliotecario'
        ]);
        DB::table('tipo_users')->insert([
            'descricao' => 'Docente'
        ]);
        DB::table('tipo_users')->insert([
            'descricao' => 'Estudante'
        ]);
    }
}
