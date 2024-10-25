@extends('layouts.app')

@section('content')
      <h1>Livros</h1>
      <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a >Home</a></li>
              <li class="breadcrumb-item active">Livros</li>
          </ol>
      </nav>
    <section class="section"> 
        <div class="row">
          <div class="col-lg-12">  
            <div class="card">
              <div class="card-body">
                  <h5 class="card-title">Dados dos livros</h5>
                  <div class ="container " > <!-- start conatiner -->
                      <div class="d-flex col-lg-12"> <!-- start d-flex -->
                          <div class="col-lg-8"> 
                            <button href="" class="btn btn-primary" onclick="LimparModalLivro();" role="button" data-bs-toggle="modal" data-bs-target="#livroModal"> Adicionar Livros </button>
                            <a href="/relatorio/livro" target="_blanck" class="btn btn-success">Gerar PDF</a>
                          </div> 
                          
                          <div class="col-lg-3 mx-1" >     
                            <form class="form" id="pesquisarLivro" method="GET">                      
                                      <input type="text" class="form-control col-lg-2" id="dadosPesquisaLivro" placeholder="Pesquisar Livro">            
                            </div> 
                            <div class="col-lg-2 mx-1" > 
                                      <button type="submit" class="btn btn-secondary" onclick="Pesquisar('livro', 'dadosPesquisaLivro','pesquisarLivro')" ><i class="bi bi-search"></i></button>
                            </form>
                          </div> 
                                         
                      </div> <!-- end d-flex -->                     
                      <br> 
                   
                   
                    <div class="row row-cols-1 row-cols-md-5 g-4">
                      @foreach ($Livros as $L)     
                        <div class="col">
                          <div class="border border-primary rounded">
                              <div class="border-end border-primary rounded" style="width: 98%;">
                              <div class="border-end border-primary rounded" style="width: 98%;">
                                  <div class="p-2 border-end border-primary rounded" style="width: 98%;">                          
                                          <h3 class="text-title d-flex justify-content-between">
                                              {{$L->titulo}}
                                          </h3>
                                          <ul class="card-text">
                                            <li>Autor: {{$L->autor}}</li>
                                            <li>Editora: {{$L->editora}}</li>
                                          </ul>
                                          <div class="card-text">
                                              <p class="text-truncate">{{$L->observacao}}</p>
                                              <p class="text-muted">{{$L->GeneroLivro->descricao}}({{$L->ano_edicao}})</p>
                                          </div>  
                                          <div class="card-footer d-flex justify-content-between">
                                                <a class="btn btn-success " href="/livros/historico/{{$L->id}}"><i class="bi bi-eye-fill"></i></a> 
                                                <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#livroModal" onclick="EditLivro({{$L}})">
                                                    <i class="bi bi-pencil"></i>
                                                </button>
                                                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletarLivroModel" 
                                                  onclick="DeletarLivro('{{$L->id}}','{{$L->titulo}}')">
                                                  <i class="bi bi-trash"></i></button>
                                          </div>                                                    
                                  </div>
                              </div>
                              </div>
                          </div>
                      </div> 
                      @endforeach  
                    </div>
               
                  </div><!-- end container --> 
                             @if($Livros->hasPages()) 
                    <nav aria-label="...">
                      <ul class="pagination my-3">
                        <li class="page-item @if($Livros->currentPage() == 1) disabled @endif">
                          <a class="page-link" href="{{$Livros->previousPageUrl()}}">Previous</a>
                        </li>
                        @for ($i = 1; $i <= $Livros->lastPage(); $i++)
                          <li class="page-item @if($Livros->currentPage() == $i) active @endif"><a class="page-link" href="{{$Livros->url($i)}}">{{$i}}</a></li>
                        @endfor                           
                        <li class="page-item  @if($Livros->currentPage() == $Livros->lastPage()) disabled @endif">
                          <a class="page-link" href="{{$Livros->nextPageUrl()}}">Next</a>
                        </li>
                      </ul>
                    </nav> 
                     @endif               
              </div>
            </div>  
          </div>
        </div>
    </section>
    @include('livros.add',  ['generosLivro' => $Generos]) 
@endsection