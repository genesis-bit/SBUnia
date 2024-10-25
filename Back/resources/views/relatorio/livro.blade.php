<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Livros</title>
    <link rel="stylesheet" href="{{ base_path('public/assets/css/pdf.css') }}">
</head>
<body>
     <p class="cabecalho">República de Angola<br>
        Ministério da Educação<br>
        Instituto Superior do Moxico</p>
    <div class="container">
       
        <h3 class="titulo">Sistema Bibliotecário Para o Instituto Superior do Moxico</h3>
        <h2 class="titulo">Lista de Livros Cadastrados no Sistema SBISM</h2>
        <div class="corpo">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Editora</th>
                        <th>Ano de Edição</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody> 
                    @foreach($Livros as $E)
                        <tr>
                            <td>{{$loop->iteration}}</td>
                            <td>{{$E->titulo}}</td>
                            <td>{{$E->autor}}</td>
                            <td>{{$E->editora}}</td>
                            <td>{{$E->ano_edicao}}</td>
                            <td>{{$E->GeneroLivro->descricao}}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            </div>
        <div class="rodape">
            <small>Sistema Bibliotecário Para o Instituto Superior do Moxico</small>
            <br> Data da Impressão: {{now()}};
        </div>
    </div>
</body>
</html>