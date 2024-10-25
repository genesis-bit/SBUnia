@extends('layouts.app')

@section('content')
      <h1>Ferramentas</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a >Home</a></li>
          <li class="breadcrumb-item active">Pagina Principal</li>
        </ol>
      </nav>
    <section class="section dashboard">     
       <!-- Content Row -->
       <div class="row">
            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2" data-bs-toggle="modal" data-bs-target="#categorialivroModel">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1 fw-bold">
                                    Categoria de Livros</div>
                                <div class="h5 mb-0 font-weight-bold text-white">{{$GeneroLivro->count()}}</div>
                                <ul>  @foreach ($GeneroLivro as $G) @if($loop->iteration <= 5)<li><span class="text-white pt-2 ps-1">{{$G->descricao}}</span> </li>  @endif @endforeach </ul>
                            </div>
                            <div class="col-auto">
                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <i class="bi bi-tags"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-success shadow h-100 py-2"  data-bs-toggle="modal" data-bs-target="#especialidadeModel">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1 fw-bold">
                                    Especialidade dos Docentes</div>
                                <div class="h5 mb-0 font-weight-bold text-white ">{{$Especialidades->count()}}</div>
                                <ul>  @foreach ($Especialidades as $Es)@if($loop->iteration <= 5) <li><span class="text-white font-weight-bold pt-2 ps-1">{{$Es->descricao}}</span> </li>@endif  @endforeach </ul>
                            </div>
                            <div class="col-auto">                               
                                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                     <i class="bi bi-mortarboard-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-info shadow h-100 py-2" data-bs-toggle="modal" data-bs-target="#prateleiraModel">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1 fw-bold">Prateleiras
                                </div>
                                <div class="row no-gutters align-items-center">
                                    <div class="col-auto">
                                        <div class="h5 mb-0 mr-3 font-weight-bold text-white">{{$Prateleiras->count()}}</div>
                                    </div>
                                    <div class="col">
                                        <ul>  @foreach ($Prateleiras as $Pr) @if($loop->iteration <= 5)<li> 
                                       <span class="text-white pt-2 ps-1">{{$Pr->descricao}}  </span> </li> @endif @endforeach </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="bi bi-archive"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pending Requests Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-warning shadow h-100 py-2" data-bs-toggle="modal" data-bs-target="#cursoModal">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-warning text-uppercase mb-1 fw-bold">Cursos da Instituição</div>  
                                 <div class="h5 mb-0 font-weight-bold text-white">{{$Cursos->count()}}</div>
                                <ul>  @foreach ($Cursos as $G) @if($loop->iteration <= 5)<li><span class="text-white pt-2 ps-1">{{$G->descricao}}</span> </li>@endif  @endforeach </ul>
                             
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-comments fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            @include('ferramentas.categoriaLivros')  
            @include('ferramentas.especialidade') 
            @include('ferramentas.prateleira') 
            @include('ferramentas.curso') 

        </div>
    </section>


    @endsection