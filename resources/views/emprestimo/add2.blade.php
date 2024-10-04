<div class="modal fade" id="emprestimoModal" tabindex="-1" aria-labelledby="modallabel" aria-hidden="true">  <!-- start modal-adicionar-qualificações-->
    <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">    
            <div class="container mt-4">    
                <h3 class="text-primary">Aderir Livro</h3>
            </div>
            
            <form action="{{route('emprestimo.store')}}" method="POST" class="row p-lg-3 gy-2">
                @csrf
                <div class="col-lg-12"> 
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="controloUsuarioemprestimo">
                        <label class="form-check-label" for="controloUsuarioemprestimo">Docente</label>
                      </div> 
                      <input type="hidden" name="ctrlId" value="0" min="0" id="ctrlId">
                </div>
                <div class="col-lg-12" >   
                    <div class="form-floating" id="divemprestimoestudante" >
                        <select class="form-select" id="emprestimoestudante" name="estudante" aria-label="Floating label select example">
                            @foreach ($Estudantes as $E)
                                <option value="{{$E->id}}">{{$E->nome}}</option>
                            @endforeach  
                        </select>
                        <label for="emprestimoestudante">Estudante</label>
                    </div>             
               </div>
               <div class="col-lg-12" >   
                <div class="form-floating"  style="display: none" id="divemprestimodocente">
                    <select class="form-select" id="emprestimodocente" name="docente" aria-label="Floating label select example">
                        @foreach ($Docentes as $D)
                            <option value="{{$D->id}}">{{$D->nome}}</option>
                        @endforeach  
                    </select>
                    <label for="emprestimodocente">Docente</label>
                </div>             
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
                <div class="col-lg-12">   
                    <div class="form-floating">
                        <input type="date" class="form-control" id="datainicio" required name="data">
                        <label for="datainicio">Data para Devolução</label>
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
                <div class="col-12  mb-3">
                    <button type="submit" class="btn btn-primary">Adicionar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </form>    
        </div>
    </div>
</div>    
