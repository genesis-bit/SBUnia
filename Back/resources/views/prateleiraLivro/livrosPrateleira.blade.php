@extends('layouts.app')

@section('content')
      <h1>Livros na Prateleira</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a >Home</a></li>
          <li class="breadcrumb-item active">Livros por Prateleira</li>
        </ol>
      </nav>
      <section class="section"> 
        <div class="row">
          <div class="col-lg-12">  
            <div class="card">
              <div class="card-body">
                  <h5 class="card-title">Livros da Prateleira de {{$PrateleiraLivros[0]->Prateleira->descricao}}</h5>
                  <div class ="container " > <!-- start conatiner -->
                      <div class="d-flex col-lg-12"> <!-- start d-flex -->
                          <div class="col-lg-8"> 
                            <button class="btn btn-primary" role="button" onclick="trocarIdPrateleira('{{$PrateleiraLivros[0]->prateleira_id}}','{{$PrateleiraLivros[0]->Prateleira->descricao}}');" data-bs-toggle="modal" data-bs-target="#prateleiraLivroModal">
                               Adicionar Livros
                               </button>
                          
                          </div> 
                          
                                                
                      </div> <!-- end d-flex -->
                      <br> 
                      <div class=" table-responsive">                    
                        <table id="dataid" class="table table-striped table-hover">                        
                            <thead>               
                              <tr>
                                  <th>#</th>
                                  <th>Titulo do Livro</th>                                 
                                  <th>Posição</th>
                                  <th>Quantidade</th>
                                  <th colspan="2">Operações</th>                                  
                              </tr>
                            </thead>               
                            <tbody>  
                            <span style="display: none">{{$total = 0}}</span>
                              @foreach($PrateleiraLivros as $PL)                              
                                <tr>
                                      <td>{{$loop->iteration}}</td> 
                                      <td>{{$PL->livro->titulo}}</td>                                     
                                      <td>{{$PL->posicao}}</td>
                                      <td>{{$PL->quantidade_livro}}</td>                                                    
                                      <td>
                                          <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#estudanteModal" onclick="EditEstudante(3, 'Editar Estudante')"><i class="bi bi-pencil"></i></button>
                                      </td>
                                      <td>
                                          <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
                                      </td>               
                                </tr>    
                                <span style="display: none">{{$total += $PL->quantidade_livro}}</span>
                              @endforeach   
                              <tr class="table-info">
                                <td>Total: </td><td colspan="2"></td><td>{{$total}}</td><td colspan="2"></td>
                              </tr>                     
                            </tbody>                            
                        </table> 
                        
                      </div> 
                  </div><!-- end container -->               
              </div>
            </div>
          </div>
        </div>
      </section>
      @include('prateleiraLivro.add') 
@endsection