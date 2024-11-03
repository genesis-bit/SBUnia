<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmprestimoController extends Controller
{
    // Retornar todos os empréstimos
    public function index()
    {
        try {
            $emprestimos = Emprestimo::with(['acervo', 'cliente', 'bibliotecario','devolucao'])->paginate();
            return response()->json($emprestimos, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar empréstimos', 'error' => $e->getMessage()], 500);
        }
    }

    // Criar um novo empréstimo
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'acervo_id' => 'required|exists:prateleira_acervos,acervo_id',
                'cliente_id' => 'required|exists:clientes,id',
                'dataPrevistaEntrega' => 'required|date',
            ]);
            $validated['bibliotecario_id'] = 11;
            $emprestimo = Emprestimo::create($validated);
            return response()->json($emprestimo, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao criar empréstimo', 'error' => $e->getMessage()], 500);
        }
    }

    // Mostrar um empréstimo específico
    public function show($id)
    {
        try {
            $emprestimo = Emprestimo::with(['acervo', 'cliente', 'bibliotecario', 'devolucao'])->find($id);

            if (!$emprestimo) {
                return response()->json(['message' => 'Empréstimo não encontrado'], 404);
            }

            return response()->json($emprestimo, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar empréstimo', 'error' => $e->getMessage()], 500);
        }
    }

    // Atualizar um empréstimo
    public function update(Request $request, $id)
    {
        try {
            $emprestimo = Emprestimo::find($id);

            if (!$emprestimo) {
                return response()->json(['message' => 'Empréstimo não encontrado'], 404);
            }

            $validated = $request->validate([
                'acervo_id' => 'required|exists:prateleira_acervos,acervo_id',
                'cliente_id' => 'required|exists:clientes,id',
                'bibliotecario_id' => 'required|exists:bibliotecarios,id',
                'dataPrevistaEntrega' => 'required|date',
            ]);

            $emprestimo->update($validated);
            return response()->json($emprestimo, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar empréstimo', 'error' => $e->getMessage()], 500);
        }
    }

    // Deletar (soft delete) um empréstimo
    public function destroy($id)
    {
        try {
            $emprestimo = Emprestimo::find($id);

            if (!$emprestimo) {
                return response()->json(['message' => 'Empréstimo não encontrado'], 404);
            }

            $emprestimo->delete();
            return response()->json(['message' => 'Empréstimo deletado com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao deletar empréstimo', 'error' => $e->getMessage()], 500);
        }
    }
}

