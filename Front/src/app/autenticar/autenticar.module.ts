import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UiModule } from '../pages/ui/ui.module';


import { LoginComponent } from './login/login.component';
import { AutenticarRoutingModule } from './autenticar-routing.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AutenticarRoutingModule,
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    UiModule,
    SlickCarouselModule
  ]
})
export class AutenticarModule { }
