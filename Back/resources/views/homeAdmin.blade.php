@extends('layouts.app')

@section('content')
    <div class="pagetitle">
      <h1>Pagina Inicial</h1>
      <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a >Home</a></li>
          </ol>
      </nav>
    </div>
    <section class="section profile">

   
        <div class="col">
          <a href="{{ route('livro.index') }}">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title fw-bold fw-bold text-center">Livros</h5>
                <p class="card-text text-black h4">{{$Livro}} Livros Cadastrados</p>
              </div>
            </div>
          </a>
        </div>
        <div class="row row-cols-1 row-cols-md-{{Auth::user()->tipo_user_id == 1?'3':'2'}} g-4">    
            <div class="col">
                <a href="{{ route('estudante.index') }}">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title fw-bold text-center">Estudantes</h5>
                      <p class="card-text text-black h4"> {{$qtdUsuarios[2]}} Estudantes Cadastrados no Sistema</p>
                    </div>
                  </div>
                </a>
            </div>
            <div class="col">
              <a href="{{ route('docente.index') }}">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title text-success fw-bold text-center">Docentes</h5>
                    <p class="card-text text-black h4"> {{$qtdUsuarios[1]}}  Docentes Cadastrados no Sistema</p>
                  </div>
                </div>
              </a>
            </div>
            @if(Auth::user()->tipo_user_id == 1)
            <div class="col">
              <a href="{{ route('biblioteca.index') }}">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title text-info fw-bold text-center">Bibliótecario</h5>
                    <p class="card-text text-black h4"> {{$qtdUsuarios[0]}}  Bibliótecario Cadastrados no Sistema</p>
                  </div>
                </div>
              </a>
            </div>
             @endif  
        </div>
       @if(($qtdUsuarios[0]+ $qtdUsuarios[1] + $qtdUsuarios[2]) != 0)
        <div class="col-lg-12">
          <div class="progress-stacked">
            <div class="progress" role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" 
                style="width: {{($qtdUsuarios[2])*100 / ($qtdUsuarios[0]+ $qtdUsuarios[1] + $qtdUsuarios[2])}}%">
              <div class="progress-bar"></div>
            </div>
            <div class="progress" role="progressbar" aria-label="Segment two" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" 
                style="width: {{($qtdUsuarios[1])*100 / ($qtdUsuarios[0]+ $qtdUsuarios[1] + $qtdUsuarios[2])}}%">
              <div class="progress-bar bg-success"></div>
            </div>
            <div class="progress" role="progressbar" aria-label="Segment three" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" 
                style="width: {{($qtdUsuarios[0])*100 / ($qtdUsuarios[0]+ $qtdUsuarios[1] + $qtdUsuarios[2])}}%">
              <div class="progress-bar bg-info"></div>
            </div>
          </div>
        </div>
        @endif
   
    </section>
@endsection
