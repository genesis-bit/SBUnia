<div class="modal fade" id="prateleiraLivroModal" tabindex="-1" aria-labelledby="modallabel" aria-hidden="true">  <!-- start modal-adicionar-qualificações-->
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content">    
                    <div class="container mt-4 ">    
                        <h3 class="text-info">Adicionar livros  <i class='bx bxs-book'></i> 
                        na prateleira de <span id="tituloModalAddPrateleiralivro"></span> </h3>
                    </div>
                    <form action="{{route('prateleiraLivro.store')}}" method="POST" class="row p-lg-3 gy-2">
                        @csrf
                    <input type="hidden" name="prateleira" id="prateleira_id">
                        <div class="col-lg-12">  
                            <div class="form-floating">
                                <select class="form-select" id="categorialivro" name="livro" aria-label="Floating label select example">
                                    @foreach ($Livros as $L)
                                        <option value="{{$L->id}}">{{$L->titulo}}</option>
                                    @endforeach  
                                </select>
                                <label for="categorialivro">Livro</label>
                            </div>
                        </div>
                        <div class="col-lg-12">   
                            <div class="form-floating">
                                <input type="number" min="0" class="form-control" id="titulolivro" name="quantidade" required >
                                <label for="titulolivro">Quantidade de Livros</label>
                            </div>             
                    </div>
                        <div class="col-lg-12">   
                            <div class="form-floating">
                                <input type="text" class="form-control" id="titulolivro" name="posicao" required >
                                <label for="titulolivro">Posição</label>
                            </div>             
                        </div>
                        <div>
                            <div>
                                <input type="text" class=">
                            </div>
                        </div>
                        <div class="col-12">
                            <button type="submit" name="add_livro" class="btn btn-primary">Adicionark</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </form>    
                </div>
            </div>
        </div>   <!-- end modal-qualifica-adicionar -->