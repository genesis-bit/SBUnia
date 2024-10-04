<?php

namespace App\Http\Controllers;

use App\Models\Genero;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GeneroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $generos = Genero::all();
            return response()->json($generos, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao buscar gêneros', 'error' => $e->getMessage()], 500);
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
                'descricao' => 'required|string|max:30',
            ]);

            $genero = Genero::create($validated);
            return response()->json($genero, 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao criar gênero', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $genero = Genero::find($id);

            if (!$genero) {
                return response()->json(['message' => 'Gênero não encontrado'], 404);
            }

            return response()->json($genero, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao buscar gênero', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        try {
            $genero = Genero::find($id);

            if (!$genero) {
                return response()->json(['message' => 'Gênero não encontrado'], 404);
            }

            return response()->json($genero, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao buscar gênero', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update($id, Request $request)
    {
        try {
            $genero = Genero::find($id);

            if (!$genero) {
                return response()->json(['message' => 'Gênero não encontrado'], 404);
            }

            $validated = $request->validate([
                'descricao' => 'required|string|max:30',
            ]);

             $genero->update($validated);
            return response()->json($genero, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar gênero', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $genero = Genero::find($id);

            if (!$genero) {
                return response()->json(['message' => 'Gênero não encontrado'], 404);
            }

            $genero->delete();
            return response()->json(['message' => 'Gênero deletado com sucesso'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao deletar gênero', 'error' => $e->getMessage()], 500);
        }
    }
}
