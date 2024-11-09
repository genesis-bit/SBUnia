import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { Router } from '@angular/router';


import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
import { Auth2Service } from 'src/app/core/services/auth2.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private formBuilder: UntypedFormBuilder,private authService: Auth2Service,
    private generalService: GeneralService,private token: TokenStorageService,
     private router: Router, private authFackservice: AuthfakeauthenticationService) { }

  loginForm: UntypedFormGroup;
  submitted: any = false;
  error: any = '';
  returnUrl: string;
  fieldTextType!:boolean;

  // set the currenr year
  year: number = new Date().getFullYear();

  ngOnInit(): void {
    document.body.classList.add("auth-body-bg");
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // swiper config
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true
  };

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.f['email'].value; // Get the username from the form
    const password = this.f['password'].value; // Get the password from the form

    // Login Api
    //this.store.dispatch(login({ email: email, password: password }));
    this.login({ email: email, password: password })
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  login(data: any) { 
    this.generalService.execute('login', GeneralConstants.CRUD_OPERATIONS.INSERT,data)
      .subscribe((res: any) => {
        let data_user = res;
        if (data_user?.access_token) {
          this.authService.setLogin(data_user.access_token, data_user.user.name, data_user.user.email,
            data_user.url_foto+'/'+data_user.user?.bibliotecario?.foto || 'foto',data_user.user?.bibliotecario?.bilhete || 'desconhecido',
            data_user.user.tipo_user_id, data_user.user?.bibliotecario?.telefone || 'desconhecido');
          this.authService.setcurrentUser(data_user)
          this.token.saveToken(data_user.access_token)
          this.token.saveUser(data_user.user)
          this.router.navigate(['/home']);
        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: res.message,
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
      
    //   this.notificacaoService.showToastMessage(3, "Deve inserir a senha ")
  }

}