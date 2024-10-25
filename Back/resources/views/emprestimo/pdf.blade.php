<div class="modal fade" id="pdfModal" tabindex="-1" aria-labelledby="modallabel" aria-hidden="true">  <!-- start modal-adicionar-qualificações-->
    <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">    
            <div class="container mt-4">    
                <h5 class="text-black">Movimento da Biblioteca livros</h5>
            </div>
            <form action="relatorio/emprestimo" method="POST" class="row p-lg-3 gy-2">
                @csrf
                <div class="col-md-6">
                    <label for="validationServer01" class="form-label">Data Inicio</label>
                    <input type="date" class="form-control" id="validationServer01" required name="dataI">
                </div>
                <div class="col-md-6">
                    <label for="validationServer02" class="form-label">Data Final</label>
                    <input type="date" class="form-control" id="validationServer02"  required name="dataF">
                </div>
                <div class="col-12  mb-3">
                    <button type="submit" class="btn btn-primary">Adicionar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </form>    
        </div>
    </div>
</div>    
