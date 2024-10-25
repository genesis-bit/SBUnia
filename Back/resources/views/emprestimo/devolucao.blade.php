<div class="modal fade" id="devolucaoModal" tabindex="-1" aria-labelledby="modallabel" aria-hidden="true">  <!-- start modal-adicionar-qualificações-->
    <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">    
            <div class="container mt-4">    
                <h3 class="text-primary">Devolução</h3>
            </div>
      
              <div class="col-lg-12" >   
                    <div class="card"> 
                        <div class="card-header">
                            <small class="text-muted">Emprestante:</small>
                            <strong class="me-auto" id="spanDevolucaonome"></strong>
                        </div>
                        <div class="card-header">
                            <small class="text-muted">Livro:</small>
                            <strong class="me-auto" id="spanDevolucaolivro"></strong>
                        </div>
                        <div class="card-body">
                           <strong class="me-auto">No Prazo</strong>
                        </div>
                    </div>     
            </div>
            <form action="{{route('devolucao.store')}}" method="POST" class="row  gy-2">
                @csrf 
                <input type="hidden" name="id" id="inputdevolucaoid">
                <div class="col-lg-12">   
                    <div class="form-floating">
                        <input type="date" class="form-control" id="datainicio" required name="data">
                        <label for="datainicio">Data Devolução</label>
                    </div>             
                </div> 
                <div class="col-12 mb-4">
                    <button type="submit" class="btn btn-success w-100">Devolver</button>
                </div>
            </form>    
        </div>
    </div>
</div>    
