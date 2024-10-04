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
        
        </div>
 

        <div class="col-lg-12 my-3"> <!-- start d-flex -->
          <div class="col-lg-8"> 
            <button href="" class="btn btn-primary" role="button" data-bs-toggle="modal" data-bs-target="#emprestimoModal"> Novo Pedido </button>
          </div>   
          <div class="col-lg-12">
            <div class ="container "> <!-- start conatiner -->
              <h3>Livros Pedidos</h3>
                <div class=" table-responsive">                    
                  <table id="dataid" class="table table-striped table-hover">                        
                      <thead>               
                        <tr>
                            <th>#</th>
                            <th>Emprestante<i class="bx bx-user"></i></th>
                            <th>Livro<i class='bx bxs-book'></i></th>
                            <th>Bibliotecario<i class="bx bx-user"></i></th>
                            <th>Tipo Emprestimo</th>
                            <th>Data do Emprestimo<i class="bi bi-calendar-plus"></i></th>
                            <th>Data Devolução<i class="bi bi-calendar-x"></i></th>
                            <th colspan="3">Operações</th>                              
                        </tr>
                      </thead>               
                      <tbody> 
                          
                      </tbody>
                  </table>
                </div> 
            
            </div><!-- end container -->
          </div>                    
        </div>
          
    </section>
@endsection
