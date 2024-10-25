  <!-- Modal -->
  <div class="modal fade" id="prateleiraModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary" id="exampleModalLabel">Prateleiras</h5>
          <button type="button" class="btn btn-primary float-end" onclick="LimparAddEdit('prateleiraId', 'prateleiraDescricao', 'tituloPrateleira2', 'Nova Prateleira');" 
          data-bs-target="#prateleira2Model" data-bs-toggle="modal" data-bs-dismiss="modal">
            <i class="bi bi-plus-circle-fill"></i>
            Nova Prateleira</button>
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
                    @foreach ($Prateleiras as $P)
                        <tr>
                            <th scope="row">{{$P->id}}</th>
                            <td>{{$P->descricao}}</td>
                            <td>
                                <button class="btn btn-outline-info"
                                  onclick="AddEdit('prateleiraId', 'prateleiraDescricao', 'tituloPrateleira2', '{{$P->id}}', '{{$P->descricao}}', 'Prateleira')"
                                  data-bs-target="#prateleira2Model" data-bs-toggle="modal" data-bs-dismiss="modal">
                                  <i class="bi bi-pencil"></i></button>
                                <button class="btn btn-outline-danger"  data-bs-toggle="modal" data-bs-target="#deletarPrateleiraeModel"
                                onclick="Deletar('FormIdPrateleira', 'tituloDeletarPrateleira', '{{$P->id}}', '{{$P->descricao}}','prateleira');">
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

  <div class="modal fade" id="prateleira2Model" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary" id="tituloPrateleira2">Nova Prateleira</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form action="{{route('prateleira.store')}}"  method="POST">
                @csrf
                   <div class="row g-2">
                        <div class="col-md-12">
                          <input type="hidden" name="id" id="prateleiraId">
                          <div class="form-floating">
                              <input type="text" class="form-control" id="prateleiraDescricao" required name="descricao">
                              <label for="prateleiraDescricao">Descricão Prateleira</label>
                          </div>
                          </div>
                          <div class="col-md">
                              <button type="submit" class="btn btn-primary">Salvar</button>
                          </div>
                    </div>
            </form>
         
        </div>
        <div class="modal-footer">
          <button class="btn btn-info" data-bs-target="#prateleiraModel" data-bs-toggle="modal" data-bs-dismiss="modal">Ver Lista</button>
        </div>
      </div>
    </div>
  </div>

  
<!-- Modal -->
<div class="modal fade" id="deletarPrateleiraeModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-black" id="exampleModalLabel"> <i class="bi bi-trash"></i>Deletar <span id="tituloDeletarPrateleira"></span>?</h5>
      </div>   
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-target="#prateleiraModel" data-bs-toggle="modal" data-bs-dismiss="modal">Cancelar</button>
        <form id="FormIdPrateleira" method="POST">
          @csrf
          @method('DELETE') 
            <button type="submit" class="btn btn-danger" >Deletar</button>
        </form>      
      </div>
    </div>
  </div>
</div>