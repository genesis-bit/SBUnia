@extends('layouts.app')

@section('content')
    <div class="pagetitle">
        <h1>Perfil</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a >Home</a></li>
                <li class="breadcrumb-item active">Perfil</li>
            </ol>
        </nav>
    </div>
    <section class="section profile">
        <div class="row">
          <div class="col-xl-4">
  
            <div class="card">
              <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
  
                <img src="assets/img/Admin.png" alt="Profile" class="rounded-circle">
                <h2>{{Auth::user()->name}}</h2>
                <h3>{{Auth::user()->TipoUsuario->descricao}}</h3>
                <div class="social-links mt-2">
                  <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                  <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                  <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                  <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
  
          </div>
  
          <div class="col-xl-8">
  
            <div class="card">
              <div class="card-body pt-3">
                <!-- Bordered Tabs -->
                <ul class="nav nav-tabs nav-tabs-bordered">
  
                  <li class="nav-item">
                    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Revisão</button>
                  </li>
  
                  <li class="nav-item">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Editar Perfil</button>
                  </li>
  
                  <li class="nav-item">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Trocar Palavra-Passe</button>
                  </li>
  
                </ul>
                <div class="tab-content pt-2">
  
                  <div class="tab-pane fade show active profile-overview text-primary" id="profile-overview">
                    
                    <h5 class="card-title text-white">Detalhes do Perfil</h5>
  
                    <div class="row">
                      <div class="col-lg-3 col-md-4 label text-white">Nome Completo</div>
                      <div class="col-lg-9 col-md-8">{{Auth::user()->name}}</div>
                    </div>
  
                    <div class="row">
                      <div class="col-lg-3 col-md-4 label text-white">Email</div>
                      <div class="col-lg-9 col-md-8">{{Auth::user()->email}}</div>
                    </div>
  
                    <div class="row">
                      <div class="col-lg-3 col-md-4 label text-white">Cargo</div>
                      <div class="col-lg-9 col-md-8">{{Auth::user()->TipoUsuario->descricao}}</div>
                    </div>

                    @if(Auth::user()->tipo_user_id == '3')

                      <div class="row">
                        <div class="col-lg-3 col-md-4 label text-white">Numero do Bilhete</div>
                        <div class="col-lg-9 col-md-8">{{Auth::user()->Docente->numero_bilhete}}</div>
                      </div>

                      <div class="row">
                        <div class="col-lg-3 col-md-4 label text-white">Carteira Profissional Nº</div>
                        <div class="col-lg-9 col-md-8">{{Auth::user()->Docente->numero_professor}}</div>
                      </div>

                      <div class="row">
                        <div class="col-lg-3 col-md-4 label text-white">Contacto</div>
                        <div class="col-lg-9 col-md-8">{{Auth::user()->Docente->contacto}}</div>
                      </div>

                      <div class="row">
                        <div class="col-lg-3 col-md-4 label text-white">Grau Academico</div>
                        <div class="col-lg-9 col-md-8">{{Auth::user()->Docente->GrauAcademico->descricao}}</div>
                      </div>

                      <div class="row">
                        <div class="col-lg-3 col-md-4 label text-white">Especialidade</div>
                        <div class="col-lg-9 col-md-8">{{Auth::user()->Docente->Especialidade->descricao}}</div>
                      </div>

                    @else
                      @if(Auth::user()->tipo_user_id == '4')

                        <div class="row">
                          <div class="col-lg-3 col-md-4 label text-white">Numero do Bilhete</div>
                          <div class="col-lg-9 col-md-8">{{Auth::user()->Estudante->numero_bilhete}}</div>
                        </div>

                        <div class="row">
                          <div class="col-lg-3 col-md-4 label text-white">Numero do Processo</div>
                          <div class="col-lg-9 col-md-8">{{Auth::user()->Estudante->numero_estudante}}</div>
                        </div>

                        <div class="row">
                          <div class="col-lg-3 col-md-4 label text-white">Contacto</div>
                          <div class="col-lg-9 col-md-8">{{Auth::user()->Estudante->contacto}}</div>
                        </div>

                        <div class="row">
                          <div class="col-lg-3 col-md-4 label text-white">Grau Academico</div>
                          <div class="col-lg-9 col-md-8">{{Auth::user()->Estudante->Curso->descricao}}</div>
                        </div>

                      

                      @endif
                    @endif
  
                  </div>
  
                  <div class="tab-pane fade profile-edit pt-3" id="profile-edit">
  
                    <!-- Profile Edit Form -->
                    <form>
                      <div class="row mb-3">
                        <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Imagem do Perfil</label>
                        <div class="col-md-8 col-lg-9">
                          <img src="assets/img/Admin.png" alt="Profile">
                          <div class="pt-2">
                            <a href="#" class="btn btn-primary btn-sm" title="Upload new profile image"><i class="bi bi-upload"></i></a>
                            <a href="#" class="btn btn-danger btn-sm" title="Remove my profile image"><i class="bi bi-trash"></i></a>
                          </div>
                        </div>
                      </div>
  
                      <div class="row mb-3">
                        <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Nome Completo</label>
                        <div class="col-md-8 col-lg-9">
                          <input name="fullName" type="text" class="form-control" id="fullName" value="Kevin Anderson">
                        </div>
                      </div>
  
                      <div class="row mb-3">
                        <label for="about" class="col-md-4 col-lg-3 col-form-label">Sobre</label>
                        <div class="col-md-8 col-lg-9">
                          <textarea name="about" class="form-control" id="about" style="height: 100px">Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</textarea>
                        </div>
                      </div>
  
                      <div class="row mb-3">
                        <label for="company" class="col-md-4 col-lg-3 col-form-label">Empresa</label>
                        <div class="col-md-8 col-lg-9">
                          <input name="company" type="text" class="form-control" id="company" value="Lueilwitz, Wisoky and Leuschke">
                        </div>
                      </div>
    
                      <div class="row mb-3">
                        <label for="Country" class="col-md-4 col-lg-3 col-form-label">País</label>
                        <div class="col-md-8 col-lg-9">
                          <input name="country" type="text" class="form-control" id="Country" value="USA">
                        </div>
                      </div>
  
                       
                      <div class="row mb-3">
                        <label for="Email" class="col-md-4 col-lg-3 col-form-label">Email</label>
                        <div class="col-md-8 col-lg-9">
                          <input name="email" type="email" class="form-control" id="Email" value="k.anderson@example.com">
                        </div>
                      </div>
  
                     
  
                      <div class="text-center">
                        <button type="submit" class="btn btn-primary">Salvar Dados</button>
                      </div>
                    </form><!-- End Profile Edit Form -->
  
                  </div>
                    
                  <div class="tab-pane fade pt-3" id="profile-change-password">
                    <!-- Change Password Form -->
                    <form action="{{route('TrocarSenha')}}" method="POST">
                      @csrf
                      <div class="row mb-3">
                        <label for="newPassword" class="col-md-4 col-lg-3 col-form-label text-white">Nova senha</label>
                        <div class="col-md-8 col-lg-9">
                          <input type="password" class="form-control  @error('password') is-invalid @enderror" id="newPassword" name="password" required autocomplete="new-password">
                            @error('password')
                                      <span class="invalid-feedback" role="alert">
                                          <strong>{{ $message }}</strong>
                                      </span>
                            @enderror
                        </div>
                      </div>
  
                      <div class="row mb-3">
                        <label for="renewPassword" class="col-md-4 col-lg-3 col-form-label text-white">Repita nova senha</label>
                        <div class="col-md-8 col-lg-9">
                          <input type="password" class="form-control  @error('password') is-invalid @enderror" id="renewPassword" name="password_confirmation" required autocomplete="new-password">
                        </div>
                      </div>
  
                      <div class="text-center">
                        <button type="submit" class="btn btn-primary">Trocar senha</button>
                      </div>
                    </form><!-- End Change Password Form -->
  
                  </div>
  
                </div><!-- End Bordered Tabs -->
  
              </div>
            </div>
  
          </div>
        </div>
      </section>
@endsection