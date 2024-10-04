<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name', 'Laravel') }}</title>
        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">
       
        <!-- Favicons -->
        <link href="/assets/img/logo-moxico.png" rel="icon">
        <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon">
        <!-- Google Fonts -->
        <link href="https://fonts.gstatic.com" rel="preconnect">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

        <!-- Vendor CSS Files -->
        <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
        <link href="/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
        <link href="/assets/vendor/quill/quill.snow.css" rel="stylesheet">
        <link href="/assets/vendor/quill/quill.bubble.css" rel="stylesheet">
        <link href="/assets/vendor/remixicon/remixicon.css" rel="stylesheet">
        <link href="/assets/vendor/simple-datatables/style.css" rel="stylesheet">

        <link href="/assets/css/style.css" rel="stylesheet">
        <style>
            .card{
                background-image: url("/assets/img/bg-login.JPG");
                background-repeat: no-repeat; /* Do not repeat the image */
                background-size: 100% 100%;
                background-position: center; /* Center the image */
            }
            .card h1, h2, h3, h4, h5, h6{
                color: white;
            }
        </style>
    </head>
    <body>
        <!-- ======= Header ======= -->
            <header id="header" class="header fixed-top d-flex align-items-center">
                @include('layouts.menu')        
            </header><!-- End Header -->
            <!-- ======= Sidebar ======= -->
            <aside id="sidebar" class="sidebar">
                @include('layouts.sidebar') 
            </aside><!-- End Sidebar-->
           
            <main id="main" class="main"> 
                @yield('content')   
            </main><!-- End #main -->

                    

            <!-- Logout Modal-->
            <div class="modal fade" id="SairModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-primary" id="exampleModalLabel">Deseja sair do sistema ?</h5>                            
                        </div>                        
                        <div class="modal-footer">
                            <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancelar</button>                            
                           
                            <form id="logout-form" action="{{ route('logout') }}" method="POST">
                                @csrf
                                <button type="submit" class="btn btn-danger">Sim</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end logout modal -->

            <!-- ======= Footer ======= -->
            <footer id="footer" class="footer">
                <div class="copyright">
                    &copy; Copyright <strong><span>Instituto Superior Politécnico Do Moxico</span></strong>. Todos direitos reservados
                </div>                
            </footer><!-- End Footer -->
            <a href="#" class="back-to-top d-flex align-items-center bg-danger justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
            <!-- Vendor JS Files -->
            <script src="/assets/vendor/apexcharts/apexcharts.min.js"></script>
            <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="/assets/vendor/chart.js/chart.umd.js"></script>
            <script src="/assets/vendor/echarts/echarts.min.js"></script>
            <script src="/assets/vendor/quill/quill.min.js"></script>
            <script src="/assets/vendor/simple-datatables/simple-datatables.js"></script>
            <script src="/assets/vendor/tinymce/tinymce.min.js"></script>
            <script src="/assets/vendor/php-email-form/validate.js"></script>
            <!-- Template Main JS File --> 
            <script src="/assets/js/main.js"></script>
            <script src="/assets/js/jquery.min.js"></script>
         
            <script>
                function trocarIdPrateleira(id, titulo){
                    $("#prateleira_id").val(id);
                    $("#tituloModalAddPrateleiralivro").text(titulo);
                } 
                function trocarIdDevolucao(id, nome, livro, data){
                    console.log(id, nome, livro, data);
                    $("#inputdevolucaoid").val(id);
                    $("#spanDevolucaonome").text(nome);
                    $("#spanDevolucaolivro").text(livro);                    
                }
               // tabelaDevolvidostabelaEmprestimotabelaSolicitacaolistaSolicitadoslistaEmprestimoCativolistaEmprestimo
                $("#listaEmprestimo").click(function(){
                    $("#divTabelas").fadeIn("slow");
                    $("#tabelaSolicitacao").fadeOut("slow");
                    $("#tabelaDevolvidos").fadeOut("slow");
                    $("#tabelaVencidos").fadeOut("slow");
                    $("#tabelaEmprestimo").fadeIn("slow");
                                        
                });
                $("#listaSolicitados").click(function(){
                    $("#divTabelas").fadeIn("slow");
                    $("#tabelaEmprestimo").fadeOut("slow");
                    $("#tabelaDevolvidos").fadeOut("slow");
                    $("#tabelaVencidos").fadeOut("slow");
                    $("#tabelaSolicitacao").fadeIn("slow");                    
                });
                $("#listaDevolvidos").click(function(){
                    $("#divTabelas").fadeIn("slow");
                    $("#tabelaSolicitacao").fadeOut("slow");
                    $("#tabelaEmprestimo").fadeOut("slow");
                    $("#tabelaVencidos").fadeOut("slow");
                    $("#tabelaDevolvidos").fadeIn("slow");                    
                });
                $("#listaVencidos").click(function(){
                    $("#divTabelas").fadeIn("slow");
                    $("#tabelaSolicitacao").fadeOut("slow");
                    $("#tabelaEmprestimo").fadeOut("slow");
                    $("#tabelaDevolvidos").fadeOut("slow");
                    $("#tabelaVencidos").fadeIn("slow");                    
                });
                $("#listaEmprestimoCativo").click(function(){
                    $("#tabelaEmprestimoAtivos").fadeOut("slow");
                });

                $("#controloUsuarioemprestimo").change(function(){
                  $("#divemprestimoestudante").toggle("slow");
                  $("#divemprestimodocente").toggle("slow");
                  var n = $("#ctrlId").val(); n ++;
                  $("#ctrlId").val(n);
                });
               

               //.
               function alertListaVazia(){
                    Swal.fire("Lista Vazia"); 
               }
               function AddEdit(idInput, descricaoInput, tituloInput, idValor, descricaoValor, tituloModal){
                $("#"+idInput).val(idValor);
                $("#"+descricaoInput).val(descricaoValor);
                $("#"+tituloInput).text("Editar "+tituloModal);
               }
               function LimparAddEdit(idInput, descricaoInput, tituloInput, tituloModal){
                $("#"+idInput).val("");
                $("#"+descricaoInput).val("");
                $("#"+tituloInput).text(tituloModal);
               }
               function Deletar(idForm,tituloInput, idValor, tituloModal,rota){
                $("#"+idForm).attr( "action", "/"+rota+"/"+idValor);
                $("#"+tituloInput).text(tituloModal); 
               } 
               function Pesquisar(rota,input, form){
                var dado = $("#"+input).val();
                $("#"+form).attr( "action", "/"+rota+"/"+dado);
               } 
               function SolicitarLivro(data){
                $("#solicitanteNome").val(data.nome);
                $("#solicitanteId").val(data.id);
               }

               function EditLivro(data){
                $("#idlivro").val(data.id);
                $("#titulolivro").val(data.titulo);
                $("#autorlivro").val(data.autor);
                $("#anoedicaolivro").val(data.ano_edicao);
                $("#editoralivro").val(data.editora);
                $("#categorialivro").val(data.genero_livro_id);
                $("#observacaolivro").val(data.observacao);
                $("#tituloModalLivro").text("Editar Livro");
               }
               function EditDocente(data, titulo){
                $("#idDocente").val(data.id);
                $("#especialidadeDocente").val(data.especialidade_id);
                $("#grauDocente").val(data.grau_academico_id);
                $("#contactoDocente").val(data.contacto);
                $("#processoDocente").val(data.numero_professor);
                $("#bilheteDocente").val(data.numero_bilhete);
                $("#nomeDocente").val(data.nome);
                $("#tituloModalDocente").text(titulo);
                
                data.id == null?$("#divEmailDocente").show():$("#divEmailDocente").hide();
                data.id == null?$("#emailDocente").val(''):$("#emailDocente").val('email@email.com');
               }
               function EditBibliotecario(data, titulo){
                $("#idBibliotecario").val(data.id);
                $("#nomeBibliotecario").val(data.name);
                $("#emailBibliotecario").val(data.email);
                $("#tituloModalBibliotecario").text("Editar");
               }
               function cleanBibliotecario(){
                $("#idBibliotecario").val("");
                $("#nomeBibliotecario").val("");
                $("#emailBibliotecario").val("");
                $("#tituloModalBibliotecario").text("Novo");
               }

               function EditEstudante(data, titulo){
                $("#idEstudante").val(data.id);
                $("#nomeEstudante").val(data.nome);
                $("#processoEstudante").val(data.numero_estudante);
                $("#bilheteEstudante").val(data.numero_bilhete);
                $("#contactoEstudante").val(data.contacto);
                $("#cursoEstudante").val(data.curso_id);
                $("#tituloModalEstudante").text(titulo);
                // nomeEstudante.processoEstudante.bilheteEstudante.contactoEstudante.emailEstudante.cursoEstudante
                data.id == null?$("#divEmailEstudante").show():$("#divEmailEstudante").hide();
                data.id == null?$("#emailEstudante").val(''):$("#emailEstudante").val('email@email.com');
               }
               function LimparModalLivro(){
                $("#idlivro").val("");
                $("#titulolivro").val("");
                $("#autorlivro").val("");
                $("#anoedicaolivro").val("");
                $("#editoralivro").val("");
                $("#categorialivro").val("");
                $("#observacaolivro").val("");
                $("#tituloModalLivro").text("Adicionar Livro");
               }
               function DeletarLivro(idValor, tituloModal){
                $("#FormDeletarLivro").attr( "action", "/livro/"+idValor);
                $("#tituloModalEliminarLivro").text(tituloModal); 
               }             
            </script>
            
              <script src="/assets/sweetAlert2/sweetalert2.all.min.js"></script>              
                <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
              @if(session()->has('StatusPositivo'))
              <script>
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "{{ session('StatusPositivo')}}",
                        showConfirmButton: false,
                        timer: 1500
                    });
              </script>
            @endif
            @if(session()->has('StatusInfo'))
              <script>
                Swal.fire("{{ session('StatusInfo')}}");                   
              </script>
            @endif
            
            @if ($errors->count() > 0)           
            <script>
              Swal.fire({
                  icon: "error",
                  title: "Oops...", 
                  text: " @foreach ($errors->all() as $message) {{$message}} @endforeach",
                  footer: ''
              });
            </script>
           @endif
                  
                

</body>

</html>