<?php

namespace App\Http\Controllers;

use App\Models\Universidade;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UniversidadeController extends Controller
{
      /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $universidades = Universidade::paginate();
            return response()->json($universidades, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar universidades', 'error' => $e->getMessage()], 500);
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
                'sigla' => 'required|string|max:20'
            ]);

            $universidade = Universidade::create($validated);
            return response()->json($universidade, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao criar universidade', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $universidade = Universidade::find($id);

            if (!$universidade) {
                return response()->json(['message' => 'Universidade não encontrada'], 404);
            }

            return response()->json($universidade, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar universidade', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Universidade $universidade)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $universidade = Universidade::find($id);

            if (!$universidade) {
                return response()->json(['message' => 'Universidade não encontrada'], 404);
            }

            $validated = $request->validate([
                'descricao' => 'required|string|max:50',
                'sigla' => 'required|string|max:20'
            ]);

            $universidade->update($validated);
            return response()->json($universidade, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar universidade', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $universidade = Universidade::find($id);

            if (!$universidade) {
                return response()->json(['message' => 'Universidade não encontrada'], 404);
            }

            $universidade->delete();
            return response()->json(['message' => 'Universidade deletada com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao deletar universidade', 'error' => $e->getMessage()], 500);
        }
    }
}
