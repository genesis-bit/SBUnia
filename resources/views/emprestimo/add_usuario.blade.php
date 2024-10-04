<div class="modal fade" id="emprestimoModal" tabindex="-1" aria-labelledby="modallabel" aria-hidden="true">  <!-- start modal-adicionar-qualificações-->
    <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">    
            <div class="container mt-3">    
                <h3 class=" text-primary">Aderir Livro</h3>
            </div>
            <form action="{{route('solicitarEmprestimo')}}" method="POST" class="row p-lg-3 gy-2">
                @csrf
                
               <div class="col-lg-12" >   
                <div class="form-floating">                
                    <input type="text" class="form-control" id="solicitanteNome" required value="" readonly>
                    <label for="datainicio">Solicitante</label>
                </div>   
                <input type="hidden" id="solicitanteId" name="IdUsuario">          
                </div>
               <div class="col-lg-12">   
                    <div class="form-floating">
                        <select class="form-select" id="categorialivro" name="livro" aria-label="Floating label select example">
                            @foreach ($Livros as $L)
                                <option value="{{$L->id}}">{{$L->titulo}}</option>
                            @endforeach  
                        </select>
                        <label for="categorialivro">Livros</label>
                    </div>             
                </div>
                <div class="col-lg-12 mb-3">  
                    <div class="form-floating">
                        <select class="form-select" id="tipoemprestimo" name="tipoE" aria-label="Floating label select example">
                            @foreach ($TipoE as $TE)
                                <option value="{{$TE->id}}">{{$TE->descricao}}</option>
                            @endforeach  
                        </select>
                        <label for="tipoemprestimo">Tipo de Adesão</label>
                      </div>
                </div>
                <div class="col-lg-12">   
                    <div class="form-floating">
                        <input type="date" class="form-control" id="datainicio" min="{{date('Y-m-d')}}" required name="data">
                        <label for="datainicio">Data para Devolução</label>   
                    </div>             
                </div>        
                <div class="col-12  mb-3">
                    <button type="submit" class="btn btn-primary">Adicionar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </form>    
        </div>
    </div>
</div>    
