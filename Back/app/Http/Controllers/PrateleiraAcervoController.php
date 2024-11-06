<?php

namespace App\Http\Controllers;

use App\Models\PrateleiraAcervo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PrateleiraAcervoController extends Controller
{
    // Retornar todos os prateleira_acervos
    public function index()
    {
        try {
            $prateleiraAcervos = PrateleiraAcervo::with(['prateleira', 'acervo', 'bibliotecario','categoria'])->paginate();
            return response()->json($prateleiraAcervos, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar prateleira_acervos', 'error' => $e->getMessage()], 500);
        }
    }

    // Criar um novo prateleira_acervo
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'prateleira_id' => 'required|exists:prateleiras,id',
                'acervo_id' => 'required|exists:acervos,id',
                'quantidadeAcervos' => 'required|integer|min:1',
                'posicao1' => 'required|max:30',
                'posicao2' => 'nullable|max:30',
            ]);
            $validated['bibliotecario_id'] = $request->user()->id;
            $prateleiraAcervo = PrateleiraAcervo::create($validated);
            return response()->json($prateleiraAcervo, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao Adicionar acervo na prateleira', 'error' => $e->getMessage()], 500);
        }
    }

    // Mostrar um prateleira_acervo específico
    public function show($id)
    {
        try {
            $prateleiraAcervo = PrateleiraAcervo::with(['prateleira', 'acervo', 'bibliotecario'])->find($id);

            if (!$prateleiraAcervo) {
                return response()->json(['message' => 'Prateleira Acervo não encontrado'], 404);
            }

            return response()->json($prateleiraAcervo, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar prateleira_acervo', 'error' => $e->getMessage()], 500);
        }
    }

    // Atualizar um prateleira_acervo
    public function update(Request $request, $id)
    {
        try {
            $prateleiraAcervo = PrateleiraAcervo::find($id);

            if (!$prateleiraAcervo) {
                return response()->json(['message' => 'Prateleira Acervo não encontrado'], 404);
            }

            $validated = $request->validate([
                'prateleira_id' => 'required|exists:prateleiras,id',
                'acervo_id' => 'required|exists:acervos,id',
                'quantidadeAcervos' => 'required|integer|min:1',
                'posicao1' => 'required|string|max:30',
                'posicao2' => 'nullable|string|max:30',
            ]);
            $validated['bibliotecario_id'] = $request->user()->id;
            $prateleiraAcervo->update($validated);
            return response()->json($prateleiraAcervo, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar acervo na prateleira', 'error' => $e->getMessage()], 500);
        }
    }

    // Deletar (soft delete) um prateleira_acervo
    public function destroy($id)
    {
        try {
            $prateleiraAcervo = PrateleiraAcervo::find($id);

            if (!$prateleiraAcervo) {
                return response()->json(['message' => 'Prateleira Acervo não encontrado'], 404);
            }

            $prateleiraAcervo->delete();
            return response()->json(['message' => 'Prateleira Acervo deletado com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao deletar prateleira_acervo', 'error' => $e->getMessage()], 500);
        }
    }
}

