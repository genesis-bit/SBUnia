 <!-- Modal -->
 <div class="modal fade" id="especialidadeModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary" id="">Especialidades</h5>
          <button type="button" class="btn btn-primary float-end"  data-bs-target="#especialidade2Model" data-bs-toggle="modal" data-bs-dismiss="modal"
          onclick="LimparAddEdit('especialidadeId', 'especialidadeDescricao', 'tituloEspecialidade2', 'Nova Especialidade');">
            <i class="bi bi-plus-circle-fill"></i>
            Nova Especialidade</button>
        </div>
        <div class="modal-body">
           
            <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Descricao</th>
                    <th scope="col">Operação</th>
                  </tr>
                </thead>
                <tbody>
                  @foreach ($Especialidades as $Es)
                  <tr>
                      <th scope="row">{{$Es->id}}</th>
                      <td>{{$Es->descricao}}</td>
                      <td> 
                          <button class="btn btn-outline-info"  onclick="AddEdit('especialidadeId', 'especialidadeDescricao', 'tituloEspecialidade2', '{{$Es->id}}', '{{$Es->descricao}}', 'Especialidade')"
                            data-bs-target="#especialidade2Model" data-bs-toggle="modal" data-bs-dismiss="modal"><i class="bi bi-pencil"></i></button>
                          <button class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deletarEspecialidadeModel"
                          onclick="Deletar('FormIdEspecialidade', 'tituloDeletarEspecialidade', '{{$Es->id}}', '{{$Es->descricao}}','especialidade');">
                          <i class="bi bi-trash"></i></button>
                      </td>
                  </tr>
                @endforeach        
                </tbody>
              </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="especialidade2Model" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary" id="tituloEspecialidade2">Nova Especialidade</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="{{route('especialidade.store')}}"  method="POST">
            @csrf
               <div class="row g-2">
                    <div class="col-md-12">
                      <input type="hidden" id="especialidadeId" name="id">
                      <div class="form-floating">
                          <input type="text" class="form-control" id="especialidadeDescricao" required placeholder="Especialidade" name="descricao">
                          <label for="especialidadeDescricao">Descrição Especialidade</label>
                      </div>
                      </div>
                      <div class="col-md">
                          <button type="submit" class="btn btn-primary">Salvar</button>
                      </div>
                </div>
        </form>         
        </div>
        <div class="modal-footer">
          <button class="btn btn-info" data-bs-target="#especialidadeModel" data-bs-toggle="modal" data-bs-dismiss="modal">Ver Lista</button>
        </div>
      </div>
    </div>
  </div>


  <!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="deletarEspecialidadeModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-black" id="exampleModalLabel"> <i class="bi bi-trash"></i>Deletar <span id="tituloDeletarEspecialidade"></span>?</h5>
      </div>   
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-target="#especialidadeModel" data-bs-toggle="modal" data-bs-dismiss="modal">Cancelar</button>
        <form id="FormIdEspecialidade" method="POST">
          @csrf
          @method('DELETE') 
            <button type="submit" class="btn btn-danger" >Deletar</button>
        </form>
      
      </div>
    </div>
  </div>
</div>