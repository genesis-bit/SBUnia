<?php

namespace App\Http\Controllers;

use App\Models\TipoAcervo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TipoAcervoController extends Controller
{
      /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $tipoacervos = TipoAcervo::paginate();
            return response()->json($tipoacervos, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar tipo Acervos', 'error' => $e->getMessage()], 500);
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

            $tipoacervo = TipoAcervo::create($validated);
            return response()->json($tipoacervo, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao criar tipoacervo', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $tipoacervo = TipoAcervo::find($id);

            if (!$tipoacervo) {
                return response()->json(['message' => 'TipoAcervo não encontrada'], 404);
            }

            return response()->json($tipoacervo, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar tipoacervo', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TipoAcervo $tipoacervo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $tipoacervo = TipoAcervo::find($id);

            if (!$tipoacervo) {
                return response()->json(['message' => 'TipoAcervo não encontrada'], 404);
            }

            $validated = $request->validate([
                'descricao' => 'required|string|max:30',
            ]);

            $tipoacervo->update($validated);
            return response()->json($tipoacervo, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar tipoacervo', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $tipoacervo = TipoAcervo::find($id);

            if (!$tipoacervo) {
                return response()->json(['message' => 'TipoAcervo não encontrada'], 404);
            }

            $tipoacervo->delete();
            return response()->json(['message' => 'TipoAcervo deletada com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao deletar tipoacervo', 'error' => $e->getMessage()], 500);
        }
    }
}
