<div class="modal fade" id="estudanteModal" tabindex="-1" aria-labelledby="modallabel" aria-hidden="true">  <!-- start modal-adicionar-qualificações-->
    <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">    
            <div class="container mt-4">    
                <h3 class="text-primary" id="tituloModalEstudante">Novo Estudante <i class="bi bi-person-plus"></i></h3>
            </div>
            <form action="{{route('estudante.store')}}" method="POST" class="row p-lg-3 gy-2">
                @csrf
                <input type="hidden" name="idEstudante" id="idEstudante">
                <div class="col-lg-12">   
                    <div class="form-floating">
                        <input type="text" class="form-control" id="nomeEstudante" name="nome" required placeholder="">
                        <label for="nomeEstudante">Nome Estudante</label>
                    </div>             
               </div> 
               <div class="col-lg-12">   
                    <div class="form-floating">
                        <input type="text" class="form-control" id="bilheteEstudante" required name="bilhete" placeholder="">
                        <label for="bilheteEstudante">Numero do Bilhete</label>
                    </div>             
                </div>
               <div class="col-lg-6">   
                    <div class="form-floating">
                        <input type="text" class="form-control" id="processoEstudante" required  name="processo" placeholder="">
                        <label for="processoEstudante">Numero do Processo</label>
                    </div>             
                </div>
             
                <div class="col-lg-6">   
                    <div class="form-floating">
                        <input type="text" class="form-control" id="contactoEstudante" required name="contacto" placeholder="">
                        <label for="contactoEstudante">Contacto</label>
                    </div>             
                </div>
                <div class="col-lg-12" id="divEmailEstudante">   
                    <div class="form-floating">
                        <input type="email" class="form-control" id="emailEstudante" name="email" required placeholder="">
                        <label for="emailEstudante">Email</label>
                    </div>             
               </div>                
                <div class="col-lg-12 mb-3">  
                    <div class="form-floating">
                        <select class="form-select" id="cursoEstudante" name="curso" aria-label="Floating label select example" required>
                            @foreach ($Cursos as $C)
                                <option value="{{$C->id}}">{{$C->descricao}}</option>
                            @endforeach  
                        </select>
                        <label for="cursoEstudante">Curso</label>
                      </div>
                </div>
                <div class="col-12  mb-3">
                    <button type="submit" name="add_livro" class="btn btn-primary">Salvar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </form>    
        </div>
    </div>
</div>   <!-- end modal-qualifica-adicionar -->
