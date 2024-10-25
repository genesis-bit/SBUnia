@extends('layouts.app')

@section('content')
      <h1>Biblioteca</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a>Home</a></li>
          <li class="breadcrumb-item active">Livros Biblioteca</li>
        </ol>
      </nav>
      <section class="section"> 
        <div class="row">
            <div class="col-lg-12">  
              <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Pedidos de Livros</h5>
                    <div class ="container " > <!-- start conatiner -->
                        <div class="d-flex col-lg-12"> <!-- start d-flex -->
                            <div class="col-lg-10 mx-3"> 
                              <button href="" class="btn btn-primary" role="button" data-bs-toggle="modal" data-bs-target="#emprestimoModal"> Novo Pedido </button>
                            </div> 
                            
                            <div class="col-lg-2" >     
                              <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#pdfModal">Gerar Pdf</button>
                            </div>                       
                        </div> <!-- end d-flex -->
                        <br> 
                        <div class="row row-cols-1 row-cols-md-4 g-3">
                          <div class="col">
                            <div class="card text-white bg-success" id="listaEmprestimo">
                              <div class="card-body">
                                <h5 class="card-title">Livros Emprestados</h5>
                                <p>(0{{ $Emprestimos->count()}}) Livro(s)</p>
                                <p class="card-text"></p>
                              </div>
                            </div>
                          </div>
                          <div class="col">
                            <div class="card text-white bg-info" id="listaSolicitados">
                              <div class="card-body">
                                <h5 class="card-title">Livros Solicitados</h5>
                                <p>(0{{ $Solicitados->count()}}) Livro(s)</p>
                                <p class="card-text"></p>
                              </div>
                            </div>
                          </div>
                          <div class="col">
                            <div class="card text-white bg-secondary" id="listaDevolvidos">
                              <div class="card-body">
                                <h5 class="card-title">Livros Devolvidos</h5>
                                <p>(0{{ $Devolvidos->total()}}) Livro(s)</p>
                                <p class="card-text"></p>
                              </div>
                            </div>
                          </div>
                          <div class="col">
                            <div class="card text-white bg-danger" id="listaVencidos">
                              <div class="card-body">
                                <h5 class="card-title">Emprestimos Vencidos</h5>
                                <p>(0{{ $Vencidos->count()}}) Livro(s)</p>
                                <p class="card-text"></p>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div><!-- end container -->                                 
                </div>
              </div>  
            </div>
            <div class="col-lg-12" style="display: none" id="divTabelas">  
              <div class="card">
                <div class="card-body">                    
                @if($Emprestimos->count() != 0)      
                <div class ="container " id="tabelaEmprestimo" style="display: none"> <!-- start conatiner -->
                                          
                    <h3>Livros Emprestados</h3>
                        <div class=" table-responsive">                    
                          <table id="dataid" class="table table-striped table-hover">                        
                              <thead>               
                                <tr>
                                    <th>#</th>
                                    <th>Emprestante<i class="bx bx-user"></i></th>
                                    <th>Tipo Emprestante</th>
                                    <th>Livro<i class='bx bxs-book'></i></th>
                                    <th>Bibliotecario</th>
                                    <th>Data do Emprestimo</i></th>
                                    <th>Data Prevista para Devolução</th>
                                    <th colspan="3">Operações</th>                              
                                </tr>
                              </thead>               
                              <tbody> 
                                @foreach ($Emprestimos as $E)                              
                                  <tr>
                                      <td>{{$loop->iteration}}</td>
                                      <td>{{$E->Emprestante->name}}</td>
                                      <td>{{$E->Emprestante->TipoUsuario->descricao}}</td>
                                      <td>{{$E->Livro->titulo}}</td>
                                      <td>{{$E->Bibliotecario->name}}</td>                                 
                                      <td>{{date('d-m-Y', strtotime($E->created_at))}}</td>
                                      <td>{{date('d-m-Y', strtotime($E->data_emprestimo))}}</td>
                                      <td>
                                          <button class="btn btn-info" data-bs-toggle="modal" 
                                          onclick="trocarIdDevolucao('{{$E->id}}', '{{$E->Emprestante->name}}', '{{$E->Livro->titulo}}', '{{$E->data_emprestimo}}')" data-bs-target="#devolucaoModal">
                                          <i class="bi bi-eye-fill"></i> Devolução 
                                        </button>
                                      </td>               
                                                
                                  </tr>
                                @endforeach    
                              </tbody>
                          </table>
                        </div> 
                     
                    </div>
                    @endif<!-- end container -->  
                    @if($Solicitados->count() != 0)     
                    <div class ="container " id="tabelaSolicitacao" style="display: none"> <!-- start conatiner -->
                      <h3>Livros Solicitados</h3>
                        <div class=" table-responsive">                    
                          <table id="dataid" class="table table-striped table-hover">                        
                              <thead>               
                                <tr>
                                    <th>#</th>
                                    <th>Emprestante<i class="bx bx-user"></i></th>
                                    <th>Tipo Emprestante</th>
                                    <th>Livro<i class='bx bxs-book'></i></th>
                                    <th>Bibliotecario<i class="bx bx-user"></i></th>
                                    <th>Data do Emprestimo</th>
                                    <th>Data Prevista para Devolução</th>
                                    <th colspan="3">Operações</th>                              
                                </tr>
                              </thead>               
                              <tbody> 
                                @foreach ($Solicitados as $So)                              
                                  <tr>
                                      <td>{{$loop->iteration}}</td>
                                      <td>{{$So->Emprestante->name}}</td>
                                      <td>{{$So->Emprestante->TipoUsuario->descricao}}</td>
                                      <td>{{$So->Livro->titulo}}</td>
                                      <td>{{$So->Bibliotecario->name}}</td>                                 
                                      <td>{{date('d-m-Y', strtotime($So->created_at))}}</td>
                                      <td>{{date('d-m-Y', strtotime($So->data_emprestimo))}}</td>
                                      <td>
                                          <button class="btn btn-info" data-bs-toggle="modal" 
                                          onclick="trocarIdDevolucao('{{$So->id}}', '{{$So->Emprestante->name}}', '{{$So->Livro->titulo}}', '{{$So->data_emprestimo}}')" data-bs-target="#devolucaoModal">
                                          <i class="bi bi-eye-fill"></i> Devolução 
                                        </button>
                                      </td>               
                                                
                                  </tr>
                                @endforeach    
                              </tbody>
                          </table>
                        </div> 
                     
                    </div><!-- end container --> 
                    @endif
                    @if($Devolvidos->count() != 0)   
                    <div class ="container " id="tabelaDevolvidos" style="display: none"> <!-- start conatiner -->
                      <h3>Livros Devolvidos</h3>
                        <div class=" table-responsive">                    
                          <table id="dataid" class="table table-striped table-hover">                        
                              <thead>               
                                <tr>
                                    <th>#</th>
                                    <th>Emprestante<i class="bx bx-user"></i></th>
                                    <th>Tipo Emprestante</th>
                                    <th>Livro<i class='bx bxs-book'></i></th>
                                    <th>Tipo Adesão</th>
                                    <th>Bibliotecario Emprestimo</th>
                                    <th>Bibliotecario Devolução</th>
                                    <th>Data do Emprestimo</th>
                                    <th>Data Devolução</th>     
                                </tr>
                              </thead>               
                              <tbody> 
                                @foreach ($Devolvidos as $De)                              
                                  <tr>
                                      <td>{{$loop->iteration}}</td>
                                      <td>{{$De->Emprestimo->Emprestante->name}}</td>
                                      <td>{{$De->Emprestimo->Emprestante->TipoUsuario->descricao}}</td>
                                      <td>{{$De->Emprestimo->Livro->titulo}}</td>
                                      <td>{{$De->Emprestimo->TipoE->descricao}}</td>
                                      <td>{{$De->Emprestimo->Bibliotecario->name}}</td>
                                      <td>{{$De->Biblioteca->name}}</td>
                                      <td>{{date('d-m-Y', strtotime($De->Emprestimo->created_at))}}</td>                                    
                                      <td>{{date('d-m-Y', strtotime($De->data))}}</td>                                                
                                  </tr>
                                @endforeach    
                              </tbody>
                          </table>
                          @if($Devolvidos->hasPages()) 
                          <nav aria-label="...">
                            <ul class="pagination">
                              <li class="page-item @if($Devolvidos->currentPage() == 1) disabled @endif">
                                <a class="page-link" href="{{$Devolvidos->previousPageUrl()}}">Previous</a>
                              </li>
                              @for ($i = 1; $i <= $Devolvidos->lastPage(); $i++)
                                <li class="page-item @if($Devolvidos->currentPage() == $i) active @endif"><a class="page-link" href="{{$Devolvidos->url($i)}}">{{$i}}</a></li>
                              @endfor                           
                              <li class="page-item  @if($Devolvidos->currentPage() == $Devolvidos->lastPage()) disabled @endif">
                                <a class="page-link" href="{{$Devolvidos->nextPageUrl()}}">Next</a>
                              </li>
                            </ul>
                          </nav> 
                           @endif 
                        </div> 
                     
                    </div><!-- end container --> 
                    @endif   
                    @if($Vencidos->count() != 0)   
                    <div class ="container " id="tabelaVencidos" style="display: none"> <!-- start conatiner -->
                      <h3>Livros Vencidos</h3>
                        <div class=" table-responsive">                    
                          <table id="dataid" class="table table-striped table-hover">                        
                              <thead>               
                                <tr>
                                    <th>#</th>
                                    <th>Emprestante<i class="bx bx-user"></i></th>
                                    <th>Tipo Emprestante</th>
                                    <th>Livro<i class='bx bxs-book'></i></th>
                                    <th>Bibliotecario<i class="bx bx-user"></i></th>
                                    <th>Data do Emprestimo</th>
                                    <th>Data Prevista para Devolução</th>                        
                                </tr>
                              </thead>               
                              <tbody> 
                                @foreach ($Vencidos as $Ve)                              
                                  <tr>
                                      <td>{{$loop->iteration}}</td>
                                      <td>{{$Ve->Emprestante->name}}</td>
                                      <td>{{$Ve->Emprestante->TipoUsuario->descricao}}</td>
                                      <td>{{$Ve->Livro->titulo}}</td>
                                      <td>{{$Ve->Bibliotecario->name}}</td>                                 
                                      <td>{{date('d-m-Y', strtotime($Ve->created_at))}}</td>
                                      <td>{{date('d-m-Y', strtotime($Ve->data_emprestimo))}}</td>  
                                  </tr>
                                @endforeach    
                              </tbody>
                          </table>                
                        </div> 
                     
                    </div><!-- end container -->  
                    @endif         
                </div>
              </div>  
            </div>
          </div>
      </section>
      @include('emprestimo.add') 
      @include('emprestimo.devolucao')   
      @include('emprestimo.pdf')  
@endsection
             