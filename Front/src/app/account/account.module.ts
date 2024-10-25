  

import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module'; 

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap/alert';
// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel'; 
 
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'; 
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal'; 
import { UIModule } from '../shared/ui/ui.module';
@NgModule({

  declarations: [  ],
  imports: [
    AuthModule,
    AccountRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    AlertModule.forRoot(), 
    SlickCarouselModule, 
    NgSelectModule, 
    BsDropdownModule,

     CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(), 
    SlickCarouselModule, 

  
    WidgetModule,
    UIModule,
    NgSelectModule,
    NgApexchartsModule,
    FormsModule, 
    ReactiveFormsModule ,
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule,
    ModalModule
  ]
 
})
export class AccountModule { }
