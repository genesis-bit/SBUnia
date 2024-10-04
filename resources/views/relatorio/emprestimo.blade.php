<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Emprestimo</title>
    <link rel="stylesheet" href="{{ base_path('public/assets/css/pdf.css') }}">
    
</head>
<body>
     <p class="cabecalho">República de Angola<br>
        Ministério da Educação<br>
        Instituto Superior do Moxico</p>
    <div class="container"> 
        <h3 class="titulo">Sistema Bibliotecário Para o Instituto Superior do Moxico</h3>
        <h2 class="titulo">Relatório de Movimentação da Biblioteca</h2>
        <h4 class="titulo">
           {{date('d-m-Y', strtotime($data[0]))}} ..... {{date('d-m-Y', strtotime($data[1]))}}
        </h4>
        <div class="corpo">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Emprestante</th>
                        <th>Tipo Emprestante</th>
                        <th>Livro</th>
                        <th>Tipo Adesão</th>
                        <th>Bibliotecario Emprestimo</th>
                        <th>Bibliotecario Devolução</th>
                        <th>Data Emprestimo</th>
                        <th>Data Prevista</th>
                        <th>Data Devolução</th>
                    </tr>
                </thead>
                <tbody> 
                    @foreach($Biblioteca as $B)
                        <tr>
                            <td>{{$loop->iteration}}</td>
                            <td>{{$B->Emprestante->name}}</td>
                            <td>{{$B->Emprestante->TipoUsuario->descricao}}</td>
                            <td>{{$B->Livro->titulo}}</td>
                            <td>{{$B->TipoE->descricao}}</td>
                            <td>{{$B->Bibliotecario->name}}</td>
                            <td>{{$B->Devolucao == null?'':$B->Devolucao->Biblioteca->name}}</td>
                            <td>{{date('d-m-Y', strtotime($B->created_at))}}</td>
                            <td>{{date('d-m-Y', strtotime($B->data_emprestimo))}}</td>
                            <td>{{$B->Devolucao == null?'':date('d-m-Y', strtotime($B->Devolucao->data))}}</td>
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