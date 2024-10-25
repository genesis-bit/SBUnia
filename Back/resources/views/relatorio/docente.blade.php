<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Docentes</title>
    
    <link rel="stylesheet" href="{{ base_path('public/assets/css/pdf.css') }}">
</head>
<body>
     <p class="cabecalho">República de Angola<br>
        Ministério da Educação<br>
        Instituto Superior do Moxico</p>
    <div class="container">
       <!--</p> <br><br><br><br><br>-->
       

        <h3 class="titulo">Sistema Bibliotecário Para o Instituto Superior do Moxico</h3>
        <h2 class="titulo">Lista de Docentes Cadastrados no Sistema SBISM</h2>
        <div class="corpo">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Grau Academico</th>
                        <th>Especialidade</th>
                        <th>Contacto</th>
                    </tr>
                </thead>
                <tbody> 
                    @foreach($Docentes as $D)
                        <tr>
                            <td>{{$loop->iteration}}</td>
                            <td>{{$D->nome}}</td>
                            <td>{{$D->GrauAcademico->descricao}}</td>
                            <td>{{$D->Especialidade->descricao}}</td>
                            <td>{{$D->contacto}}</td>
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