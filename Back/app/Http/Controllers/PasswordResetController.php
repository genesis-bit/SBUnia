<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class PasswordResetController extends Controller
{
        // Envia o link de redefinição de senha para o email fornecido
        public function enviarLink(Request $request)
        {
            $request->validate(['email' => 'required|email']);
    
            $status = Password::sendResetLink(
                $request->only('email')
            );
    
            return $status === Password::RESET_LINK_SENT
                ? response()->json(['message' => 'Link de redefinição enviado para seu email.'])
                : response()->json(['error' => 'Erro ao enviar o link de redefinição.'], 500);
        }
    
        // Reseta a senha com o token recebido
        public function resetarSenha(Request $request)
        { 
            $request->validate([
                'email' => 'required|email',
                'token' => 'required',
                'password' => 'required|min:8|confirmed',
            ]);
    
            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    $user->password = Hash::make($password);
                    $user->save();
                }
            );
    
            return $status === Password::PASSWORD_RESET
                ? response()->json(['message' => 'Senha redefinida com sucesso.'])
                : response()->json(['error' => 'Erro ao redefinir a senha.'], 500);
        }
}
