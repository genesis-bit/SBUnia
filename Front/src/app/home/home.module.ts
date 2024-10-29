import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { UIModule } from '../../shared/ui/ui.module';
// import { WidgetModule } from '../../shared/widget/widget.module';

import { NgApexchartsModule } from 'ng-apexcharts';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule,BsDropdownConfig} from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SimplebarAngularModule } from 'simplebar-angular';
import { UIModule } from '../shared/ui/ui.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { FerramentasComponent } from './ferramentas/ferramentas.component';
import { EstudanteComponent } from './estudante/estudante.component';
import { EmprestimoComponent } from './emprestimo/emprestimo.component';


import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { UiModule } from '../pages/ui/ui.module';
import { LivroComponent } from './livro/livro.component';
import { BibliotecarioComponent } from './bibliotecario/bibliotecario.component';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({  
  declarations: [HomeComponent, FerramentasComponent, EstudanteComponent, EmprestimoComponent, LivroComponent, BibliotecarioComponent],
  imports: [
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    UIModule,

    NgxMaskDirective,
    NgxMaskPipe,

    HomeRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    WidgetModule,
    NgApexchartsModule,
    //SharedModule,
    SimplebarAngularModule,
    ModalModule.forRoot()
  ],
  providers: [BsDropdownConfig, provideNgxMask()],
})
export class HomeModule { }
