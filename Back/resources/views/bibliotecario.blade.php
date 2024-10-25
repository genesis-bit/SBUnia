@extends('layouts.app')

@section('content')
      <h1>Bibliotecario</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a >Home</a></li>
          <li class="breadcrumb-item active">Bibliotecario</li>
        </ol>
      </nav>
      <section class="section"> 
        <div class="row">
          <div class="col-lg-12">  
            <div class="card">
              <div class="card-body">
                  <h5 class="card-title">Lista de Bibliotecario</h5>
                  <div class ="container " > <!-- start conatiner -->
                      <div class="d-flex col-lg-12"> <!-- start d-flex -->
                          <div class="col-lg-8"> 
                            <button href="" class="btn btn-primary" role="button" onclick="cleanBibliotecario()" data-bs-toggle="modal" data-bs-target="#bibliotecarioModal"> Adicionar Bibliotecário </button>
                            <a href="/relatorio/bibliotecario" target="_blanck" class="btn btn-success">Gerar PDF</a>
                          </div> 
                          
                          <div class="col-lg-3 mx-1" >     
                            <form class="form" action="" method="GET">                      
                                    <input type="text" class="form-control col-lg-2" name="nome_medicos" placeholder="Pesquisar Docente">            
                          </div> 
                          <div class="col-lg-2 mx-1" > 
                                    <button type="submit" class="btn btn-secondary "><i class="bi bi-search"></i></button>
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
                                <th>Email</th>
                                <th>Cargo</th>
                                <th colspan="3">Operações</th>
                            
                            </tr>
                          </thead>               
                          <tbody>  
                            @foreach ($Bibliotecarios as $B)                              
                            <tr>
                                <td>{{$B->id}}</td>
                                <td>{{$B->name}}</td>
                                <td>{{$B->email}}</td>
                                <td>{{$B->TipoUsuario->descricao}}</td>
                                <td>
                                  <button class="btn btn-success "><i class="bi bi-eye-fill"></i></button>
                                </td>               
                                <td>
                                    <button class="btn btn-info" onclick="EditBibliotecario({{$B}});" data-bs-toggle="modal" data-bs-target="#bibliotecarioModal"><i class="bi bi-pencil"></i></button>
                                </td>
                                <td>
                                    <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
                                </td>        
                            </tr>
                          @endforeach                        
                               
                          </tbody>
                      </table>

                    </div> 
                  </div><!-- end container -->               
              </div>
            </div>  
          </div>
        </div>
      </section>
     
      <div class="modal fade" id="bibliotecarioModal" tabindex="-1" aria-labelledby="modallabel" aria-hidden="true">  <!-- start modal-adicionar-qualificações-->
        <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content">    
                <div class="container mt-4">    
                    <h3 class=" text-primary"><span id="tituloModalBibliotecario"></span> Bibliotecario <i class="bi bi-person-plus"></i></h3>
                </div>       
                <form action="{{route('biblioteca.store')}}" method="POST" class="row p-lg-3 gy-2">
                    @csrf
                    <input type="hidden" name="id" id="idBibliotecario">
                    <div class="col-lg-12">   
                        <div class="form-floating">
                            <input type="text" class="form-control" id="nomeBibliotecario" name="nome" required >
                            <label for="nomeBibliotecario">Nome Bibliotecário</label>
                        </div>             
                   </div>
                   <div class="col-lg-12">   
                      <div class="form-floating">
                          <input type="email" class="form-control" id="emailBibliotecario" name="email" required >
                          <label for="emailBibliotecario">Email</label>
                      </div>             
                  </div> 
                    <div class="col-12 mb-3">
                        <button type="submit" name="add_livro" class="btn btn-primary">Adicionar</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </form>    
            </div>
        </div>
    </div>   <!-- end modal-qualifica-adicionar -->
@endsection