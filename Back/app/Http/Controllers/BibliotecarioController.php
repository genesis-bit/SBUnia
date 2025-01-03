<?php

namespace App\Http\Controllers;

use App\Models\Bibliotecario;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\RegisterController;

class BibliotecarioController extends Controller
{
    // Retornar todos os bibliotecários
    public function index()
    {
        try {
            $bibliotecarios = Bibliotecario::with(['user', 'genero'])->paginate();;
            return response()->json($bibliotecarios, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar bibliotecários', 'error' => $e->getMessage()], 500);
        }
    }

    // Criar um novo bibliotecário
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nome' => 'required|string|max:50',
                'bilhete' => 'required|string|max:20|unique:bibliotecarios,bilhete',
                'ndi' => 'required|string|max:20|unique:bibliotecarios,ndi',
                'telefone' => 'nullable|string|max:30',
                'genero_id' => 'required|exists:generos,id',
                'email' => 'required|email|unique:users,email',
                'foto' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($request->hasFile('foto')) {  
                $validated['foto'] = $request->file('foto')->store('images', 'public');
            }
           
            $usuario = RegisterController::usuario(['name' => $request['nome'], 'email' => $request['email'], 'tipo_user_id' => 3 , 'password' => '0123456789']);
            $validated['id'] = $usuario->id;
          
            $bibliotecario = Bibliotecario::create($validated);
            return response()->json($bibliotecario, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao criar bibliotecário', 'error' => $e->getMessage()], 500);
        }
    }

    // Mostrar um bibliotecário específico
    public function show($id)
    {
        try {
            $bibliotecario = Bibliotecario::with(['user', 'genero'])->find($id);

            if (!$bibliotecario) {
                return response()->json(['message' => 'Bibliotecário não encontrado'], 404);
            }

            return response()->json($bibliotecario, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao buscar bibliotecário', 'error' => $e->getMessage()], 500);
        }
    }

    // Atualizar um bibliotecário
    public function update(Request $request, $id)
    {
        try {
            $bibliotecario = Bibliotecario::find($id);

            if (!$bibliotecario) {
                return response()->json(['message' => 'Bibliotecário não encontrado'], 404);
            }

            $validated = $request->validate([
                'id' => 'required|exists:users,id',
                'nome' => 'required|string|max:50',
                'bilhete' => 'required|string|max:20|unique:bibliotecarios,bilhete,' . $id,
                'ndi' => 'required|string|max:20|unique:bibliotecarios,ndi,' . $id,
                'telefone' => 'nullable|string|max:30',
                'genero_id' => 'required|exists:generos,id',
            ]);

            $bibliotecario->update($validated);
            return response()->json($bibliotecario, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar bibliotecário', 'error' => $e->getMessage()], 500);
        }
    }

    // Deletar (soft delete) um bibliotecário
    public function destroy($id)
    {
        try {
            $bibliotecario = Bibliotecario::find($id);

            if (!$bibliotecario) {
                return response()->json(['message' => 'Bibliotecário não encontrado'], 404);
            }

            $bibliotecario->delete();
            return response()->json(['message' => 'Bibliotecário deletado com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao deletar bibliotecário', 'error' => $e->getMessage()], 500);
        }
    }

    public function url()
    {
        $url = asset('storage/');
        return response()->json(["url"=>$url]);        
    }
}
