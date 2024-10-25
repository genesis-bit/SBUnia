@extends('layouts.app')

@section('content')
      <h1>Livros na Prateleira</h1>
      <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a >Home</a></li>
              <li class="breadcrumb-item active">Prateleiras</li>
          </ol>
      </nav>
        <div class="row row-cols-1 row-cols-md-4 g-4">
            @foreach ($Prateleiras as $P)
                <div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title d-flex justify-content-between">
                                    <span>{{$P->descricao}}</span>
                                    <button href="" class="btn btn-primary" role="button" onclick="trocarIdPrateleira('{{$P->id}}','{{$P->descricao}}');" data-bs-toggle="modal" data-bs-target="#prateleiraLivroModal"> <i class="bi bi-plus-circle-fill"></i>Livro</button>
                                </h5>
                                <ul class="card-text">
                                    @foreach ($P->Livros as $PL)
                                        <li>{{$PL->titulo}}</li>
                                    @endforeach 
                                </ul>
                            </div>
                            <div class="card-footer">
                                <a class="btn btn-link" @if($P->Livros->count() != 0) href="/livros/prateleira/{{$P->id}}" @endif>
                                    Lista Completa<small class="text-muted"> ({{$P->Livros->count()}})</small></a>
                            </div>
                        </div>
                    </div>
            @endforeach             
        </div>

        @include('prateleiraLivro.add')    
@endsection


