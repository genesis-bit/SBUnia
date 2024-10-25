import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap/alert';
// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UIModule } from '../../shared/ui/ui.module'; 
 
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { UsersEmpresasComponent } from './users-empresas/users-empresas.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { TipoEmpresasComponent } from './tipo-empresas/tipo-empresas.component';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({

  declarations: [EmpresasComponent,TipoEmpresasComponent,UsersEmpresasComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    AlertModule.forRoot(),
    UIModule,
    EmpresaRoutingModule,
    SlickCarouselModule, 
    NgSelectModule, 
    BsDropdownModule,

     CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    UIModule, 
    SlickCarouselModule,
    NgxPaginationModule,

  
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
export class EmpresaModule { }

 