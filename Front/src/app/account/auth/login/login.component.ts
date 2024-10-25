import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { login } from 'src/app/store/Authentication/authentication.actions';
import { GeneralService } from 'src/app/core/services/general.service';
import { GeneralConstants } from 'src/app/core/constants/GeneralConstants';
import { User } from '../model/user';
import { Auth2Service } from 'src/app/core/services/auth2.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {

  loginForm: UntypedFormGroup;
  submitted: any = false;
  error: any = '';
  returnUrl: string;
  fieldTextType!: boolean;

  user = new User();
  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder,

    private token: TokenStorageService,
    private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private store: Store,
    private authFackservice: AuthfakeauthenticationService, private generalService: GeneralService, private GeneralConstants: GeneralConstants,

    private authService: Auth2Service) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    // form validation
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    //admin@themesbrand.com
    //123456
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    const email = this.f['email'].value; // Get the username from the form
    const password = this.f['password'].value; // Get the password from the form 


    // Login Api
    this.store.dispatch(login({ email: email, password: password }));


    this.user.email = this.f['email'].value; // Get the username from the form 
    //this.user.username = this.f['email'].value; // Get the username from the form
    this.user.password = this.f['password'].value; // Get the password from the form 

    //   console.log(this.user)
    this.login()

  }


  login() {

    //  if (this.validacaoService.validarEmail(this.user.email))
    //   if (this.user.password)
    console.log(this.user)
    
    this.generalService.execute('login', 1, this.user)
      .subscribe((res: any) => {
        let data_user = res.data;
        console.log(res)
        console.log(data_user)
        if (data_user?.token) {
          this.authService.setLogin(data_user.token, data_user.id, data_user.email, data_user.username, data_user.foto);
          this.authService.setcurrentUser(data_user)
          this.token.saveToken(data_user.token)
          this.token.saveUser ( data_user.email)
         
      this.router.navigate(['/']);
          // this.buscarMenu()

        }
      });
      
    //   this.notificacaoService.showToastMessage(3, "Deve inserir a senha ")
  }


  async buscarMenu() {
    this.generalService.execute(`buscar-menu`, GeneralConstants.CRUD_OPERATIONS.READ)
      .subscribe((res: any) => {

        if (res.data) {
          console.log(res.data)
          this.authService.setMenu(res.data);
          this.onLoggedin(res.data)
        }
      });
  }

  onLoggedin(e: Event) {
    //e.preventDefault();
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      //this.router.navigate([this.returnUrl]);
      this.router.navigate(["/"]);
    }
  }

  /**
 * Password Hide/Show
 */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
