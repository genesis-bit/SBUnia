<ul class="sidebar-nav" id="sidebar-nav">
    <li class="nav-item">
        <a class="nav-link " href="/home">
            <i class="bi bi-grid"></i>
            <span>Menu Principal</span>
        </a>
    </li><!-- End menu principal Nav -->
   
    <li class="nav-item">
        <a class="nav-link collapsed" href="{{route('emprestimo.index') }}">
            <i class="bx bxs-book"></i>
            <span>Biblioteca</span>
        </a>
    </li><!-- End Estudantes Page Nav -->
    <li class="nav-item">
        <a class="nav-link collapsed" href="{{ route('prateleiraLivro.index') }}">
            <i class="bx bx-book-open"></i>
            <span>Prateleira</span>
        </a>
    </li><!-- End Perfil Page Nav -->
    @if (Auth::user()->tipo_user_id == 2 || Auth::user()->tipo_user_id == 1)
    <li class="nav-heading">Bibliotecário</li>
    <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#components-nav1" data-bs-toggle="collapse" href="#">
            <i class="bx bxs-group"></i><span>Usuarios</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="components-nav1" class="nav-content collapse " data-bs-parent="#sidebar-nav">
           <li>
                <a href="{{route('estudante.index') }}">
                    <i class="bx bx-user"></i><span>Estudantes</span>
                </a>
            </li>
             <li>
                <a href="{{route('docente.index') }}">
                    <i class="bx bx-user"></i><span>Docentes</span>
                </a>
            </li>         
        </ul>
    </li><!-- End Components Nav -->
    <li class="nav-item">
        <a class="nav-link collapsed" href="{{ route('livro.index') }}">
            <i class='bx bxs-book'></i>
            <span>Livros</span>
        </a>
    </li><!-- End relatorio Page Nav -->
    
    @endif

    @if (Auth::user()->tipo_user_id == 1 )
    <li class="nav-heading">Administrador</li>
    <li class="nav-item">
        <a class="nav-link collapsed" href="{{ route('categoriaLivro.index') }}">
            <i class="bi bi-gear"></i>
            <span>Ferramentas</span>
        </a>
    </li><!-- End relatorio Page Nav -->
    <li class="nav-item">
        <a class="nav-link collapsed" href="{{route('biblioteca.index') }}">
            <i class="bi bi-person"></i>
            <span>Bibliotecário</span>
        </a>
    </li><!-- End Perfil Page Nav --> 
    @endif
</ul>