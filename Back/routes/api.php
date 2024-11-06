<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TipoUserController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\GeneroController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\UniversidadeController;
use App\Http\Controllers\TipoClienteController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\BibliotecarioController;
use App\Http\Controllers\PrateleiraController;
use App\Http\Controllers\AcervoController;
use App\Http\Controllers\PrateleiraAcervoController;
use App\Http\Controllers\EmprestimoController;
use App\Http\Controllers\DevolucaoController;
use App\Http\Controllers\TipoAcervoController;
use App\Http\Controllers\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/url_base', [BibliotecarioController::class, 'url']);
    Route::get('/acervo-out-prateleira', [AcervoController::class, 'AcervoOut']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('tipo-users', TipoUserController::class);
    Route::apiResource('categorias', CategoriaController::class);
    Route::apiResource('generos', GeneroController::class);
    Route::apiResource('cursos', CursoController::class);
    Route::apiResource('universidades', UniversidadeController::class);
    Route::apiResource('tipo-clientes', TipoClienteController::class);
    Route::apiResource('tipo-acervos', TipoAcervoController::class);
    Route::apiResource('clientes', ClienteController::class);
    Route::apiResource('bibliotecarios', BibliotecarioController::class);
    Route::apiResource('prateleiras', PrateleiraController::class);
    Route::apiResource('acervos', AcervoController::class);
    Route::apiResource('prateleira-acervos', PrateleiraAcervoController::class);
    Route::apiResource('emprestimos', EmprestimoController::class);
    Route::apiResource('devolucoes', DevolucaoController::class);
});
