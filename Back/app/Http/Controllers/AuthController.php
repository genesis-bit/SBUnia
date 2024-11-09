<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        //return response()->json(['data'=>'valeu']);
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciais inválidas'], 200);
        }

        $user = Auth::user();
        $user->Bibliotecario;
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login bem-sucedido',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
            'url_foto' => asset('storage/')
        ]);
    }
    public function updatePassword(Request $request)
    {
        try {  
                    // Valida os dados recebidos
            $request->validate([
                'senha_atual' => 'required|min:4',
                'nova_senha' => 'required|min:4|confirmed',
            ]);

            // Obtém o usuário autenticado
            $user = Auth::user();

            // Verifica se a senha atual está correta
            if (!Hash::check($request->senha_atual, $user->password)) {
                return response()->json(['message' => 'A Palavra Passe atual está incorreta.'], 201);
            }

            // Atualiza a senha do usuário
            $user->password = Hash::make($request->nova_senha);
            $user->save();

            return response()->json(['data'=>true,'message' => 'Palavra Passe alterada com sucesso!'], 201);
         
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao atualizar Palavra Passe', 'error' => $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout realizado com sucesso']);
    }
}
