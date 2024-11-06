<?php

namespace App\Http\Controllers;

use App\Models\Prateleira;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PrateleiraController extends Controller
{
    // Retornar todas as prateleiras
    public function index()
    {
        try {
            // $prateleiras = Prateleira::with(['acervos' => function ($query) {
            //     $query->select('acervos.id', 'acervos.titulo', 'prateleira_acervos.quantidadeAcervos');
            // }])->get();
            $prateleiras = Prateleira::with(['acervos'])->paginate();
            return response()->json($prateleiras, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar prateleiras', 'error' => $e->getMessage()], 500);
        }
    }

    // Criar uma nova prateleira
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'descricao' => 'required|string|max:30',
                'observacao' => 'nullable|string|max:50',
            ]);

            $prateleira = Prateleira::create($validated);
            return response()->json($prateleira, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao criar prateleira', 'error' => $e->getMessage()], 500);
        }
    }

    // Mostrar uma prateleira específica
    public function show($id)
    {
        try {
            $prateleira = Prateleira::find($id);

            if (!$prateleira) {
                return response()->json(['message' => 'Prateleira não encontrada'], 404);
            }

            return response()->json($prateleira, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar prateleira', 'error' => $e->getMessage()], 500);
        }
    }

    // Atualizar uma prateleira
    public function update(Request $request, $id)
    {
        try {
            $prateleira = Prateleira::find($id);

            if (!$prateleira) {
                return response()->json(['message' => 'Prateleira não encontrada'], 404);
            }

            $validated = $request->validate([
                'descricao' => 'required|string|max:30',
                'observacao' => 'nullable|string|max:50',
            ]);

            $prateleira->update($validated);
            return response()->json($prateleira, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar prateleira', 'error' => $e->getMessage()], 500);
        }
    }

    // Deletar (soft delete) uma prateleira
    public function destroy($id)
    {
        try {
            $prateleira = Prateleira::find($id);

            if (!$prateleira) {
                return response()->json(['message' => 'Prateleira não encontrada'], 404);
            }

            $prateleira->delete();
            return response()->json(['message' => 'Prateleira deletada com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao deletar prateleira', 'error' => $e->getMessage()], 500);
        }
    }
}
