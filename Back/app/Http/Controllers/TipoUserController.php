<?php

namespace App\Http\Controllers;

use App\Models\TipoUser;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TipoUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $TipoUsers = TipoUser::paginate();
            return response()->json($TipoUsers, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar Tipo de Usuario', 'error' => $e->getMessage()], 500);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TipoUser $tipoUser)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TipoUser $tipoUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TipoUser $tipoUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TipoUser $tipoUser)
    {
        //
    }
}
