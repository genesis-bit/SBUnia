@extends('layouts.app')

@section('content')
      <h1>Estudantes</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a >Home</a></li>
          <li class="breadcrumb-item active">Estudantes</li>
        </ol>
      </nav>
      <section class="section"> 
        <div class="row">
          <div class="col-lg-12">  
            <div class="card">
              <div class="card-body">
                  <h5 class="card-title">Lista de Estudantes</h5>
                  <div class ="container " > <!-- start conatiner -->
                      <div class="d-flex col-lg-12"> <!-- start d-flex -->
                          <div class="col-lg-8"> 
                            <button class="btn btn-primary" role="button" data-bs-toggle="modal" data-bs-target="#estudanteModal" onclick="EditEstudante({{$Estudante}}, 'Novo Estudante')">
                               Adicionar Estudantes
                               </button>
                            <a href="/relatorio/estudante" target="_blanck" class="btn btn-success">Gerar PDF</a>
                          </div> 
                          
                          <div class="col-lg-3 mx-1" >     
                            <form class="form" id="pesquisarEstudante" method="GET">                      
                                    <input type="text" class="form-control col-lg-2" id="dadosPesquisa" placeholder="Pesquisar Estudante">            
                          </div> 
                          <div class="col-lg-2 mx-1" > 
                                    <button type="submit" class="btn btn-secondary" onclick="Pesquisar('estudante', 'dadosPesquisa','pesquisarEstudante')" ><i class="bi bi-search"></i></button>
                            </form>
                          </div>                       
                      </div> <!-- end d-flex -->
                      <br> 
                      <div class=" table-responsive">                    
                        <table id="dataid" class="table table-striped table-hover">                        
                            <thead>               
                              <tr>
                                  <th>Processo Nº</th>
                                  <th>Nome</th>                                 
                                  <th>Numero Bilhete</th>
                                  <th>Curso</th>
                                  <th>Contacto</th>
                                  <th colspan="3">Operações</th>
                              
                              </tr>
                            </thead>               
                            <tbody>  
                                @foreach ($Estudantes as $E)                              
                                <tr>
                                      <td>{{$E->numero_estudante}}</td> 
                                      <td>{{$E->nome}}</td>                                     
                                      <td>{{$E->numero_bilhete}}</td>
                                      <td>{{$E->Curso->descricao}}</td>
                                      <td>{{$E->contacto}}</td>   
                                      <td>
                                          <button class="btn btn-success "  data-bs-toggle="modal" data-bs-target="#emprestimoModal" onclick="SolicitarLivro({{$E}})"><i class="bx bxs-book"></i></button>
                                      </td>               
                                      <td>
                                          <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#estudanteModal" onclick="EditEstudante({{$E}}, 'Editar Estudante')"><i class="bi bi-pencil"></i></button>
                                      </td>
                                      <td>
                                          <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
                                      </td>               
                                  </tr>
                                @endforeach                        
                            
                            </tbody>                            
                        </table> 
                        
                        @if($Estudantes->hasPages()) 
                        <nav aria-label="...">
                          <ul class="pagination">
                            <li class="page-item @if($Estudantes->currentPage() == 1) disabled @endif">
                              <a class="page-link" href="{{$Estudantes->previousPageUrl()}}">Previous</a>
                            </li>
                            @for ($i = 1; $i <= $Estudantes->lastPage(); $i++)
                              <li class="page-item @if($Estudantes->currentPage() == $i) active @endif"><a class="page-link" href="{{$Estudantes->url($i)}}">{{$i}}</a></li>
                            @endfor                           
                            <li class="page-item  @if($Estudantes->currentPage() == $Estudantes->lastPage()) disabled @endif">
                              <a class="page-link" href="{{$Estudantes->nextPageUrl()}}">Next</a>
                            </li>
                          </ul>
                        </nav> 
                         @endif                     
                      </div> 
                  </div><!-- end container -->               
              </div>
            </div>
          </div>
        </div>
      </section>
      @include('estudantes.add') 
      @include('emprestimo.add_usuario') 
@endsection