<div class="modal fade" id="livroModal" tabindex="-1" aria-labelledby="modallabel" aria-hidden="true">  <!-- start modal-adicionar-qualificações-->
    <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">    
            <div class="container mt-4">    
                <h3 class="text-primary" id="tituloModalLivro">Adicionar livros  <i class='bx bxs-book'></i></h3>
            </div>
            <form action="{{route('livro.store')}}" method="POST" class="row p-lg-3 gy-2">
                @csrf
                <input type="hidden" name="id" id="idlivro">
                <div class="col-lg-12">   
                    <div class="form-floating">
                        <input type="text" class="form-control  @error('titulo') is-invalid @enderror" id="titulolivro" name="titulo" required placeholder="livro">
                        <label for="titulolivro">Titulo do Livro</label>
                    </div>  
                    @error('titulo')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror           
               </div>
               <div class="col-lg-12">   
                    <div class="form-floating">
                        <input type="text" class="form-control  @error('autor') is-invalid @enderror" id="autorlivro" required  name="autor" placeholder="autor">
                        <label for="autorlivro">Autor</label>
                    </div>   
                    @error('autor')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror              
                </div>
                <div class="col-lg-4">   
                    <div class="form-floating">
                        <input type="text" class="form-control  @error('anoedicao') is-invalid @enderror" id="anoedicaolivro" required name="anoedicao" placeholder="ano">
                        <label for="anoedicaolivro">Ano de Edição</label>
                    </div>  
                    @error('anoedicao')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror               
                </div>
                <div class="col-lg-8">   
                    <div class="form-floating">
                        <input type="text" class="form-control  @error('editora') is-invalid @enderror" id="editoralivro" required name="editora" placeholder="editora">
                        <label for="editoralivro">Editora</label>
                    </div>   
                    @error('editora')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror              
                </div>
                
                <div class="col-lg-12">  
                    <div class="form-floating">
                        <select class="form-select" id="categorialivro" required name="genero" aria-label="Floating label select example">
                            @foreach ($generosLivro as $G)
                                <option value="{{$G->id}}">{{$G->descricao}}</option>
                            @endforeach  
                        </select>
                        <label for="categorialivro">Categoria</label>
                      </div>
                </div>
                <div class="col-lg-12">   
                    <div class="form-floating">
                        <textarea type="text" class="form-control  @error('observacao') is-invalid @enderror" id="observacaolivro" required name="observacao" placeholder="observação"></textarea>
                        <label for="observacaolivro">Observação</label>
                    </div>  
                    @error('observacao')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror               
                </div>
                <div class="col-12  mb-3">
                    <button type="submit" name="add_livro" class="btn btn-primary">Adicionar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </form>    
        </div>
    </div>
</div>   <!-- end modal-qualifica-adicionar -->

<!-- Modal -->
<div class="modal fade" id="deletarLivroModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-black" id="exampleModalLabel"> <i class="bi bi-trash"></i>Deletar <span id="tituloModalEliminarLivro"></span>?</h5>
        </div>   
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-target="#prateleiraModel" data-bs-toggle="modal" data-bs-dismiss="modal">Cancelar</button>
          <form id="FormDeletarLivro" method="POST">
            @csrf
            @method('DELETE') 
              <button type="submit" class="btn btn-danger" >Deletar</button>
          </form>      
        </div>
      </div>
    </div>
  </div>
