<?php

namespace App\Http\Controllers;

use App\Models\TipoCliente;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TipoClienteController extends Controller
{
      /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $tipoclientes = TipoCliente::all();
            return response()->json($tipoclientes, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao buscar tipos de clientes', 'error' => $e->getMessage()], 500);
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

            $tipocliente = TipoCliente::create($validated);
            return response()->json($tipocliente, 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao criar tipocliente', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $tipocliente = TipoCliente::find($id);

            if (!$tipocliente) {
                return response()->json(['message' => 'TipoCliente não encontrada'], 404);
            }

            return response()->json($tipocliente, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao buscar tipocliente', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TipoCliente $tipocliente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $tipocliente = TipoCliente::find($id);

            if (!$tipocliente) {
                return response()->json(['message' => 'TipoCliente não encontrada'], 404);
            }

            $validated = $request->validate([
                'descricao' => 'required|string|max:30',
            ]);

            $tipocliente->update($validated);
            return response()->json($tipocliente, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar tipocliente', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $tipocliente = TipoCliente::find($id);

            if (!$tipocliente) {
                return response()->json(['message' => 'TipoCliente não encontrada'], 404);
            }

            $tipocliente->delete();
            return response()->json(['message' => 'TipoCliente deletada com sucesso'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Erro ao deletar tipocliente', 'error' => $e->getMessage()], 500);
        }
    }
}
