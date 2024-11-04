<?php

namespace App\Http\Controllers;

use App\Models\Devolucao;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DevolucaoController extends Controller
{
    // Retornar todas as devoluções
    public function index()
    {
        try {
            $devolucoes = Devolucao::with(['bibliotecario', 'emprestimo'])->paginate();
            return response()->json($devolucoes, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar devoluções', 'error' => $e->getMessage()], 500);
        }
    }

    // Criar uma nova devolução
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'id' => 'required|exists:emprestimos,id',
               // 'bibliotecario_id' => 'required|exists:bibliotecarios,id',
                'observacao' => 'nullable|string',
            ]);
            $validated['bibliotecario_id'] = $request->user()->id;
            $devolucao = Devolucao::create($validated);
            return response()->json($devolucao, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao criar devolução', 'error' => $e->getMessage()], 500);
        }
    }

    // Mostrar uma devolução específica
    public function show($id)
    {
        try {
            $devolucao = Devolucao::with(['bibliotecario', 'emprestimo'])->find($id);

            if (!$devolucao) {
                return response()->json(['message' => 'Devolução não encontrada'], 404);
            }

            return response()->json($devolucao, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar devolução', 'error' => $e->getMessage()], 500);
        }
    }

    // Atualizar uma devolução
    public function update(Request $request, $id)
    {
        try {
            $devolucao = Devolucao::find($id);

            if (!$devolucao) {
                return response()->json(['message' => 'Devolução não encontrada'], 404);
            }

            $validated = $request->validate([
                'observacao' => 'nullable|string',
            ]);
            $validated['bibliotecario_id'] = $request->user()->id;
            $devolucao->update($validated);
            return response()->json($devolucao, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar devolução', 'error' => $e->getMessage()], 500);
        }
    }

    // Deletar (soft delete) uma devolução
    public function destroy($id)
    {
        try {
            $devolucao = Devolucao::find($id);

            if (!$devolucao) {
                return response()->json(['message' => 'Devolução não encontrada'], 404);
            }

            $devolucao->delete();
            return response()->json(['message' => 'Devolução deletada com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao deletar devolução', 'error' => $e->getMessage()], 500);
        }
    }
}

