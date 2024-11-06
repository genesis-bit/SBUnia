<?php

namespace App\Http\Controllers;

use App\Models\Acervo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AcervoController extends Controller
{
    // Retornar todos os acervos
    public function index()
    {
        try {
            $acervos = Acervo::with(['categoria', 'tipoAcervo'])->paginate();;
            return response()->json($acervos, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar acervos', 'error' => $e->getMessage()], 500);
        }
    }


    // Criar um novo acervo
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'titulo' => 'required|string|max:50',
                'ator' => 'required|string|max:60',
                'editora' => 'required|string|max:60',
                'ano_edicao' => 'required|integer|digits:4',
                'categoria_id' => 'required|exists:categorias,id',
                'tipo_acervo_id' => 'required|exists:tipo_acervos,id',
                'observacao' => 'nullable|string',
            ]);

            $acervo = Acervo::create($validated);
            return response()->json($acervo, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao criar acervo', 'error' => $e->getMessage()], 500);
        }
    }

    // Mostrar um acervo específico
    public function show($id)
    {
        try {
            $acervo = Acervo::with(['categoria', 'tipoAcervo'])->find($id);

            if (!$acervo) {
                return response()->json(['message' => 'Acervo não encontrado'], 404);
            }

            return response()->json($acervo, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar acervo', 'error' => $e->getMessage()], 500);
        }
    }

    // Atualizar um acervo
    public function update(Request $request, $id)
    {
        try {
            $acervo = Acervo::find($id);

            if (!$acervo) {
                return response()->json(['message' => 'Acervo não encontrado'], 404);
            }

            $validated = $request->validate([
                'titulo' => 'required|string|max:50',
                'ator' => 'required|string|max:60',
                'editora' => 'required|string|max:60',
                'ano_edicao' => 'required|integer|digits:4',
                'categoria_id' => 'required|exists:categorias,id',
                'tipo_acervo_id' => 'required|exists:tipo_acervos,id',
                'observacao' => 'nullable|string',
            ]);

            $acervo->update($validated);
            return response()->json($acervo, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar acervo', 'error' => $e->getMessage()], 500);
        }
    }

    // Deletar (soft delete) um acervo
    public function destroy($id)
    {
        try {
            $acervo = Acervo::find($id);

            if (!$acervo) {
                return response()->json(['message' => 'Acervo não encontrado'], 404);
            }

            $acervo->delete();
            return response()->json(['message' => 'Acervo deletado com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao deletar acervo', 'error' => $e->getMessage()], 500);
        }
    }

    public function AcervoOut() //busca os acervos sem prateleiras
    {
        try {
            $acervosSemPrateleira = Acervo::doesntHave('prateleiras')->paginate();
            return response()->json($acervosSemPrateleira, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar acervo sem prateleiras', 'error' => $e->getMessage()], 500);
        }
    }
}
