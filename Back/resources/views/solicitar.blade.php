@extends('layouts.app')

@section('content')
      <h1>Emprestimo</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a >Home</a></li>
          <li class="breadcrumb-item active">Livros Biblioteca</li>
        </ol>
      </nav>
      <section class="section"> 
        <div class="row">
            <div class="col-lg-12">  
              <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-white">Solicitação de Livros</h5>
                    <div class=" table-responsive">  
                        <table id="dataid" class="table table-striped table-hover">                        
                              <thead>               
                                <tr>
                                    <th>#</th>
                                    <th>Emprestante<i class='bx bxs-book'></i></th>
                                    <th>Tipo Emprestante<i class="bx bx-user"></i></th>
                                    <th>Email<i class="bx bx-user"></i></th>         
                                </tr>
                              </thead>               
                              <tbody> 
                                @foreach ($Emprestante as $De)                              
                                  <tr>
                                      <td>{{$De->id}}</td>
                                      <td>{{$De->name}}</td>
                                      <td>{{$De->TipoUsuario->descricao}}</td> 
                                      <td>{{$De->email}}</td>
                                  </tr>
                               <span style="display: none"> {{$usuario = $De->id}}</span>  
                                @endforeach    
                              </tbody>
                        </table>                  
                        <table id="dataid" class="table table-striped table-hover">                        
                              <thead>               
                                <tr>
                                    <th>#</th>
                                    <th>Titulo do Livro<i class='bx bxs-book'></i></th>
                                    <th>Autor<i class="bx bx-user"></i></th>
                                    <th>Ano de Edição<i class="bi bi-calendar-plus"></i></th>
                                    <th>Editora<i class="bi bi-calendar-x"></i></th>
                                    <th>Prateleira</th>
                                    <th>Posição</th>
                                    <th colspan="3">Disponivel</th>                              
                                </tr>
                              </thead>               
                              <tbody> 
                                @foreach ($Livros as $De)                              
                                  <tr>
                                      <td>{{$De->livro_id}}</td>
                                      <td>{{$De->livro->titulo}}</td>
                                      <td>{{$De->livro->autor}}</td>
                                      <td>{{$De->livro->ano_edicao}}</td>
                                      <td>{{$De->livro->editora}}</td>
                                      <td>{{$De->prateleira->descricao}}</td>
                                      <td>{{$De->posicao}}</td>
                                      <td>{{$De->quantidade_livro - $LivrosOcupados->count() }}</td>
                                  </tr>
                                  <span style="display: none">{{$numero = $De->quantidade_livro - $LivrosOcupados->count()}}</span>
                                  <span style="display: none"> {{$livro = $De->livro_id }}</span>
                                @endforeach    
                              </tbody>
                        </table>
                        @if($numero == 0)
                          <button class="btn btn-danger" disabled>Não temos livros Disponivel</button>
                        @else
                        <form action="{{route('emprestimo.store')}}" method="POST" style="display:inline">
                              @csrf 
                            <input type="hidden" name="livro" value="{{$livro}}">
                            <input type="hidden" name="data" value="{{$Data}}">
                            <input type="hidden" name="tipoE" value="{{$Tipo}}">
                            <input type="hidden" name="usuario" value="{{$usuario}}">
                            <button type="submit" class="btn btn-primary">Confirmar</button>
                        </form>
                          
                        @endif
                        <a class="btn btn-secondary" href="{{route('emprestimo.index') }}">Voltar</a>
                    </div> 
                </div>                             
              </div>  
            </div>
        </div>
      </section>
@endsection
             