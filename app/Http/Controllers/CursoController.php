<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CursoController extends Controller
{
      /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $cursos = Curso::all();
            return response()->json($cursos, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao buscar cursos', 'error' => $e->getMessage()], 500);
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

            $curso = Curso::create($validated);
            return response()->json($curso, 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao criar curso', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $curso = Curso::find($id);

            if (!$curso) {
                return response()->json(['message' => 'Curso não encontrado'], 404);
            }

            return response()->json($curso, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao buscar curso', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Curso $curso)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $curso = Curso::find($id);

            if (!$curso) {
                return response()->json(['message' => 'Curso não encontrado'], 404);
            }

            $validated = $request->validate([
                'descricao' => 'required|string|max:50',
            ]);

            $curso->update($validated);
            return response()->json($curso, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar curso', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $curso = Curso::find($id);

            if (!$curso) {
                return response()->json(['message' => 'Curso não encontrado'], 404);
            }

            $curso->delete();
            return response()->json(['message' => 'Curso deletada com sucesso'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao deletar curso', 'error' => $e->getMessage()], 500);
        }
    }
}
