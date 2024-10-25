<div class="modal fade" id="estudanteModal" tabindex="-1" aria-labelledby="modallabel" aria-hidden="true">  <!-- start modal-adicionar-qualificações-->
    <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">    
            <div class="container mt-4">    
                <h3 class="text-primary" id="tituloModalDocente">Novo Docente <i class="bi bi-person-plus"></i></h3>
            </div>
   
            <form action="{{route('docente.store')}}" method="POST" class="row p-lg-3 gy-2">
                @csrf
                <input type="hidden"  id="idDocente" name="idDocente">
                <div class="col-lg-12">   
                    <div class="form-floating">
                        <input type="text" class="form-control" id="nomeDocente" name="nome" required placeholder="">
                        <label for="nomeDocente">Nome Docente</label>
                    </div>             
               </div>
               <div class="col-lg-12">   
                    <div class="form-floating">
                        <input type="text" class="form-control" id="bilheteDocente" required name="bilhete" placeholder="">
                        <label for="bilheteDocente">Numero do Bilhete</label>
                    </div>             
                </div>
                <div class="col-lg-6">   
                    <div class="form-floating">
                        <input type="text" class="form-control" id="processoDocente" required  name="processo" placeholder="">
                        <label for="processoDocente">Numero Mecanografico</label>
                    </div>             
                </div>
                <div class="col-lg-6">   
                    <div class="form-floating">
                        <input type="text" class="form-control" id="contactoDocente" required name="contacto" placeholder="">
                        <label for="contactoDocente">Contacto</label>
                    </div>             
                </div>
                <div class="col-lg-12" id="divEmailDocente">   
                    <div class="form-floating">
                        <input type="email" class="form-control" id="emailDocente" name="email" required placeholder="">
                        <label for="emailDocente">Email</label>
                    </div>             
               </div>     
               <div class="col-lg-12 mb-3">  
                <div class="form-floating">
                    <select class="form-select" id="grauDocente" name="grau" aria-label="Floating label select example" required >
                        @foreach ($Grau as $G)
                            <option value="{{$G->id}}">{{$G->descricao}}</option>
                        @endforeach  
                    </select>
                    <label for="grauDocente">Grau Academico</label>
                  </div>
            </div>           
                <div class="col-lg-12 mb-3">  
                    <div class="form-floating">
                        <select class="form-select" id="especialidadeDocente" name="especialidade" aria-label="Floating label select example" required>
                            @foreach ($Especialidades as $E)
                                <option value="{{$E->id}}">{{$E->descricao}}</option>
                            @endforeach  
                        </select>
                        <label for="especialidadeDocente">Especialidade</label>
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
