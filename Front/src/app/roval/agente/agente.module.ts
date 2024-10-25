import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap/alert';
// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UIModule } from '../../shared/ui/ui.module';  
import { AgenteRoutingModule } from './agente-routing'; 
import { AgentesComponent } from './agentes/agentes.component';
import { TipoAgentesComponent } from './tipo-agentes/tipo-agentes.component';
import { NgxPaginationModule } from 'ngx-pagination';
   

import { NgApexchartsModule } from 'ng-apexcharts';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination'; 
import { NgSelectModule } from '@ng-select/ng-select'; 
import { WidgetModule } from '../../shared/widget/widget.module';   
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RamoAtividadeComponent } from './ramo-atividade/ramo-atividade.component'; 

@NgModule({
  declarations: [AgentesComponent,  TipoAgentesComponent, RamoAtividadeComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    UIModule,
    AgenteRoutingModule,
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
export class AgenteModule { }
