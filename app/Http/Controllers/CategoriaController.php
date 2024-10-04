<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $categorias = Categoria::all();
            return response()->json($categorias, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao buscar categorias', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'descricao' => 'required|string|max:50',
            ]);

            $categoria = Categoria::create($validated);
            return response()->json($categoria, 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao criar categoria', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $categoria = Categoria::find($id);

            if (!$categoria) {
                return response()->json(['message' => 'Categoria não encontrada'], 404);
            }

            return response()->json($categoria, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao buscar categoria', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categoria $categoria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $categoria = Categoria::find($id);

            if (!$categoria) {
                return response()->json(['message' => 'Categoria não encontrada'], 404);
            }

            $validated = $request->validate([
                'descricao' => 'required|string|max:50',
            ]);

            $categoria->update($validated);
            return response()->json($categoria, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar categoria', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $categoria = Categoria::find($id);

            if (!$categoria) {
                return response()->json(['message' => 'Categoria não encontrada'], 404);
            }

            $categoria->delete();
            return response()->json(['message' => 'Categoria deletada com sucesso'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao deletar categoria', 'error' => $e->getMessage()], 500);
        }
    }
}
