<?php

namespace App\Http\Controllers;

use App\Models\Devolucao;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DevolucaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        try{   
         
            $IdBlibliotecario = Auth::user()->id;          
            Devolucao::create([
                    'id' => $request['id'],
                    'bibliotecario_id' => $IdBlibliotecario,
                    'data' => $request['data'],                
                ]); 
             
            return redirect()->back()->with([
                'StatusPositivo' => "Devolução feita com sucesso",
            ]);            
        }
        catch(Exception $e){
            return response()->json($e, 400);
        }  
    }

    /**
     * Display the specified resource.
     */
    public function show(Devolucao $devolucao)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Devolucao $devolucao)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Devolucao $devolucao)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Devolucao $devolucao)
    {
        //
    }
}
