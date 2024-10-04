@extends('layouts.app')

@section('content')
      <h1>Docentes</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a >Home</a></li>
          <li class="breadcrumb-item active">Docentes</li>
        </ol>
      </nav>
      <section class="section"> 
        <div class="row">
          <div class="col-lg-12">  
            <div class="card">
              <div class="card-body">
                  <h5 class="card-title">Lista de Docentes</h5>
                  <div class ="container " > <!-- start conatiner -->
                      <div class="d-flex col-lg-12"> <!-- start d-flex -->
                          <div class="col-lg-8"> 
                            <button href="" class="btn btn-primary" role="button" data-bs-toggle="modal" data-bs-target="#estudanteModal" onclick="EditDocente({{$DocenteVazio}}, 'Novo Docente')"> 
                              Adicionar Docente
                            </button>
                            <a href="/relatorio/docente" target="_blanck" class="btn btn-success">Gerar PDF</a>
                          </div> 
                          
                          <div class="col-lg-3 mx-1" >     
                            <form class="form" id="formpesquisarDocente" method="GET">                      
                                    <input type="text" class="form-control col-lg-2" id="inputPesquisarDocente" placeholder="Pesquisar Estudante">            
                          </div> 
                          <div class="col-lg-2 mx-1" > 
                                    <button type="submit" class="btn btn-secondary" onclick="Pesquisar('docente', 'inputPesquisarDocente','formpesquisarDocente')" ><i class="bi bi-search"></i></button>
                            </form>
                          </div>                     
                      </div> <!-- end d-flex -->
                      <br> 
                      <div class=" table-responsive">                    
                      <table id="dataid" class="table table-striped table-hover">                        
                          <thead>               
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Nº Mecanografico</th>
                                <th>Numero Bilhete</th>
                                <th>Grau Academico</th>
                                <th>Especialidade</th>
                                <th>Contacto</th>
                                <th colspan="3">Operações</th>
                            
                            </tr>
                          </thead>               
                          <tbody>  
                              @foreach ($Docentes as $D)                              
                               <tr>
                                    <td>{{$D->id}}</td>
                                    <td>{{$D->nome}}</td>
                                    <td>{{$D->numero_professor}}</td>
                                    <td>{{$D->numero_bilhete}}</td>
                                    <td>{{$D->GrauAcademico->descricao}}</td>
                                    <td>{{$D->Especialidade->descricao}}</td>
                                    <td>{{$D->contacto}}</td>   
                                    <td>
                                      <button class="btn btn-success "  data-bs-toggle="modal" data-bs-target="#emprestimoModal" onclick="SolicitarLivro({{$D}})"><i class="bx bxs-book"></i></button>
                                  </td>               
                                    <td>
                                        <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#estudanteModal" onclick="EditDocente({{$D}}, 'Editar Docente')" >
                                          <i class="bi bi-pencil"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
                                    </td>               
                                </tr>
                              @endforeach                         
                           
                          </tbody>
                      </table>

                      @if($Docentes->hasPages()) 
                      <nav aria-label="...">
                        <ul class="pagination">
                          <li class="page-item @if($Docentes->currentPage() == 1) disabled @endif">
                            <a class="page-link" href="{{$Docentes->previousPageUrl()}}">Previous</a>
                          </li>
                          @for ($i = 1; $i <= $Docentes->lastPage(); $i++)
                            <li class="page-item @if($Docentes->currentPage() == $i) active @endif"><a class="page-link" href="{{$Docentes->url($i)}}">{{$i}}</a></li>
                          @endfor                           
                          <li class="page-item  @if($Docentes->currentPage() == $Docentes->lastPage()) disabled @endif">
                            <a class="page-link" href="{{$Docentes->nextPageUrl()}}">Next</a>
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
      @include('docentes.add') 
      @include('emprestimo.add_usuario') 
@endsection