<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    // Retornar todos os clientes
    public function index()
    {
        try {
            $clientes = Cliente::all();
            return response()->json($clientes, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao buscar clientes', 'error' => $e->getMessage()], 500);
        }
    }

    // Criar um novo cliente
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'nome' => 'required|string|max:50',
                'bilhete' => 'required|string|max:20|unique:clientes,bilhete',
                'ndi' => 'required|string|max:20|unique:clientes,ndi',
                'telefone' => 'nullable|string|max:30',
                'genero_id' => 'required|exists:generos,id',
                'tipo_cliente_id' => 'required|exists:tipo_clientes,id',
                'universidade_id' => 'nullable|exists:universidades,id',
                'curso_id' => 'nullable|exists:cursos,id',
            ]);

            $cliente = Cliente::create($validated);
            return response()->json($cliente, 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao criar cliente', 'error' => $e->getMessage()], 500);
        }
    }

    // Mostrar um cliente específico
    public function show($id)
    {
        try {
            $cliente = Cliente::find($id);

            if (!$cliente) {
                return response()->json(['message' => 'Cliente não encontrado'], 404);
            }

            return response()->json($cliente, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao buscar cliente', 'error' => $e->getMessage()], 500);
        }
    }

    // Atualizar um cliente
    public function update(Request $request, $id)
    {
        try {
            $cliente = Cliente::find($id);

            if (!$cliente) {
                return response()->json(['message' => 'Cliente não encontrado'], 404);
            }

            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'nome' => 'required|string|max:50',
                'bilhete' => 'required|string|max:20|unique:clientes,bilhete,' . $id,
                'ndi' => 'required|string|max:20|unique:clientes,ndi,' . $id,
                'telefone' => 'nullable|string|max:30',
                'genero_id' => 'required|exists:generos,id',
                'tipo_cliente_id' => 'required|exists:tipo_clientes,id',
                'universidade_id' => 'nullable|exists:universidades,id',
                'curso_id' => 'nullable|exists:cursos,id',
            ]);

            $cliente->update($validated);
            return response()->json($cliente, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar cliente', 'error' => $e->getMessage()], 500);
        }
    }

    // Deletar (soft delete) um cliente
    public function destroy($id)
    {
        try {
            $cliente = Cliente::find($id);

            if (!$cliente) {
                return response()->json(['message' => 'Cliente não encontrado'], 404);
            }

            $cliente->delete();
            return response()->json(['message' => 'Cliente deletado com sucesso'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao deletar cliente', 'error' => $e->getMessage()], 500);
        }
    }
}

