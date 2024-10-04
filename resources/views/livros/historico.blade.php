@extends('layouts.app')

@section('content')
      <h1>Historico do Livro</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a >Home</a></li>
          <li class="breadcrumb-item"><a >Livro</a></li>
          <li class="breadcrumb-item active">Historico</li>
        </ol>
      </nav>
      <section class="section"> 
        <div class="row">
            <div class="col-lg-12">  
              <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-white">Livros</h5>
                    <div class=" table-responsive">  
                               
                        <table id="dataid" class="table table-striped table-hover">                        
                              <thead>               
                                <tr>
                                    <th>Titulo do Livro<i class='bx bxs-book'></i></th>
                                    <th>Autor<i class="bx bx-user"></i></th>
                                    <th>Ano de Edição<i class="bi bi-calendar-plus"></i></th>
                                    <th>Editora</th>
                                    <th>Categoria</th>
                                    <th colspan = "3">Observação</th>                            
                                </tr>
                              </thead>               
                              <tbody>                         
                                  <tr>
                                      <td>{{$PrateleiraLivros->livro->titulo}}</td>
                                      <td>{{$PrateleiraLivros->livro->autor}}</td>
                                      <td>{{$PrateleiraLivros->livro->ano_edicao}}</td>
                                      <td>{{$PrateleiraLivros->livro->editora}}</td>
                                      <td>{{$PrateleiraLivros->livro->GeneroLivro->descricao}}</td>
                                      <td>{{$PrateleiraLivros->livro->observacao}}</td>
                                  </tr>   
                              </tbody>
                        </table>
                        <table id="dataid" class="table table-striped table-hover">                        
                              <thead>               
                                <tr>
                                    <th>Prateleira</th>
                                    <th>Posição</th>
                                    <th>Quantidade</th>
                                    <th>Disponível</th>         
                                </tr>
                              </thead>               
                              <tbody> 
                                <tr>
                                    <td>{{$PrateleiraLivros->prateleira->descricao}}</td>
                                      <td>{{$PrateleiraLivros->posicao}}</td> 
                                      <td>{{$PrateleiraLivros->quantidade_livro}}</td>
                                      <td>{{$PrateleiraLivros->quantidade_livro - $Solicitacao->count()}}</td>
                                  </tr>    
                              </tbody>
                        </table> 
                        <table id="dataid" class="table table-striped table-hover">  
                          @if($Solicitacao->count()!=0)
                              <thead>               
                                <tr>
                                    <th>#</th>
                                    <th>Emprestante<i class='bx bxs-book'></i></th>
                                    <th>Tipo Emprestante</th>
                                    <th>Tipo de Adesão</th>
                                    <th>Data do Emprestimo</th>
                                    <th>Data para Devolução</th>         
                                </tr>
                              </thead>               
                              <tbody>
                                @foreach ($Solicitacao as $S)                              
                                  <tr>
                                      <td>{{$loop->iteration}}</td>
                                      <td>{{$S->Emprestante->name}}</td>
                                      <td>{{$S->Emprestante->TipoUsuario->descricao}}</td> 
                                      <td>{{$S->TipoE->descricao}}</td>
                                      <td>{{date('d-m-Y', strtotime($S->created_at))}}</td>
                                      <td>{{date('d-m-Y', strtotime($S->data_emprestimo))}}</td>
                                  </tr>
                                @endforeach    
                              </tbody>
                            @endif
                        </table>           
                       <a class="btn btn-secondary" href="{{route('livro.index') }}">Voltar</a>
                    </div> 
                </div>                             
              </div>  
            </div>
        </div>
      </section>
@endsection