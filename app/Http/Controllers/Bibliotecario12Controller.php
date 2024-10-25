<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\RegisterController;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;

class BibliotecarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $Bibliotecarios = User::where('tipo_user_id','=','2')->paginate(10);
            return view('bibliotecario', compact(['Bibliotecarios'])); 
        }
        catch(Exception $e){
            return response()->json($e, 400);
        }
    }
    public function PDF() {
        try{
              $Bibliotecarios = User::where('tipo_user_id','=','2')->OrderBy('name')->paginate();
              $pdf = PDF::loadView('relatorio.bibliotecario',compact('Bibliotecarios'))
            ;
              return $pdf->stream();
        }
        catch(Exception $e){
              return response()->json($e, 400);
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
        try{
            $request->validate([
                'nome' => 'required|min:5'
            ]);
           
            if($request->id == null){ 
                $request->validate([
                    'email' => 'required|email|unique:users,email',
                ]);
                $usuario = new RegisterController();  
                $usuario::usuario(['name' => $request['nome'], 'email' => $request['email'], 'tipo_user_id' => '2', 'password' => '0123456789']);    
                $sms = "Bibliotecário Cadastrado com sucesso"; 
            } 
            else{
                
                $usuario = User::findOrFail($request->id);
                if($usuario->email != $request->email)$request->validate(['email' => 'required|email|unique:users,email']);

                $usuario->name = $request->nome;
                $usuario->email = $request->email;

                $usuario->save();

                $sms = "Bibliotecário atualizado com sucesso";
            }
            return redirect()->back()->with([
                'StatusPositivo' => $sms,
            ]);      
        }
        catch(Exception $e){
            return response()->json($e, 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
