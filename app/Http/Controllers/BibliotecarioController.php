<?php

namespace App\Http\Controllers;

use App\Models\Bibliotecario;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BibliotecarioController extends Controller
{
    // Retornar todos os bibliotecários
    public function index()
    {
        try {
            $bibliotecarios = Bibliotecario::all();
            return response()->json($bibliotecarios, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao buscar bibliotecários', 'error' => $e->getMessage()], 500);
        }
    }

    // Criar um novo bibliotecário
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'id' => 'required|exists:users,id',
                'nome' => 'required|string|max:50',
                'bilhete' => 'required|string|max:20|unique:bibliotecarios,bilhete',
                'ndi' => 'required|string|max:20|unique:bibliotecarios,ndi',
                'telefone' => 'nullable|string|max:30',
                'genero_id' => 'required|exists:generos,id',
            ]);

            $bibliotecario = Bibliotecario::create($validated);
            return response()->json($bibliotecario, 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao criar bibliotecário', 'error' => $e->getMessage()], 500);
        }
    }

    // Mostrar um bibliotecário específico
    public function show($id)
    {
        try {
            $bibliotecario = Bibliotecario::find($id);

            if (!$bibliotecario) {
                return response()->json(['message' => 'Bibliotecário não encontrado'], 404);
            }

            return response()->json($bibliotecario, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao buscar bibliotecário', 'error' => $e->getMessage()], 500);
        }
    }

    // Atualizar um bibliotecário
    public function update(Request $request, $id)
    {
        try {
            $bibliotecario = Bibliotecario::find($id);

            if (!$bibliotecario) {
                return response()->json(['message' => 'Bibliotecário não encontrado'], 404);
            }

            $validated = $request->validate([
                'id' => 'required|exists:users,id',
                'nome' => 'required|string|max:50',
                'bilhete' => 'required|string|max:20|unique:bibliotecarios,bilhete,' . $id,
                'ndi' => 'required|string|max:20|unique:bibliotecarios,ndi,' . $id,
                'telefone' => 'nullable|string|max:30',
                'genero_id' => 'required|exists:generos,id',
            ]);

            $bibliotecario->update($validated);
            return response()->json($bibliotecario, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar bibliotecário', 'error' => $e->getMessage()], 500);
        }
    }

    // Deletar (soft delete) um bibliotecário
    public function destroy($id)
    {
        try {
            $bibliotecario = Bibliotecario::find($id);

            if (!$bibliotecario) {
                return response()->json(['message' => 'Bibliotecário não encontrado'], 404);
            }

            $bibliotecario->delete();
            return response()->json(['message' => 'Bibliotecário deletado com sucesso'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao deletar bibliotecário', 'error' => $e->getMessage()], 500);
        }
    }
}
