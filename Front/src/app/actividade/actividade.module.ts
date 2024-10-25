import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ActividadeRoutingModule } from './actividade-routing.module';
import { ActividadesComponent } from './actividades/actividades.component';
import { ActividadeTiposComponent } from './actividade-tipos/actividade-tipos.component';
import { ActividadeDetalhesComponent } from './actividade-detalhes/actividade-detalhes.component';
import { ActividadeAreasComponent } from './actividade-areas/actividade-areas.component';
import { ActividadeTarefasComponent } from './actividade-tarefas/actividade-tarefas.component';
import { ActividadeTarefaEstadosComponent } from './actividade-tarefa-estados/actividade-tarefa-estados.component';
import { ActividadeTarefaUsersComponent } from './actividade-tarefa-users/actividade-tarefa-users.component';
import { ActividadeTarefaTiposComponent } from './actividade-tarefa-tipos/actividade-tarefa-tipos.component';
import { ActividadeTarefaHistoricosComponent } from './actividade-tarefa-historicos/actividade-tarefa-historicos.component';
import { ActividadeGestorUsersComponent } from './actividade-gestor-users/actividade-gestor-users.component'; 
import { UIModule } from '../shared/ui/ui.module';
import { WidgetModule } from '../shared/widget/widget.module';
 
import { AlertModule } from "ngx-bootstrap/alert";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { NgxPaginationModule } from "ngx-pagination";
import { NgApexchartsModule } from "ng-apexcharts";
import { TooltipModule } from "ngx-bootstrap/tooltip";



import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { NgSelectModule } from "@ng-select/ng-select";
import { ActividadeMinhasTarefasComponent } from './actividade-minhas-tarefas/actividade-minhas-tarefas.component';
import { ActividadeConfiguracaoComponent } from './actividade-configuracao/actividade-configuracao.component';
import { ActividadeTarefasNewComponent } from './actividade-tarefas-new/actividade-tarefas-new.component';
import { ActividadeComentariosComponent } from './actividade-comentarios/actividade-comentarios.component';
import { ActividadesNewComponent } from './actividades-new/actividades-new.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { CategoriasComponent } from './categorias/categorias.component';
@NgModule({
  declarations: [ 
  
      
    ActividadesComponent, ActividadeTiposComponent,
     ActividadeDetalhesComponent, ActividadeAreasComponent, 
     ActividadeTarefasComponent, ActividadeTarefaEstadosComponent, 
     ActividadeTarefaUsersComponent, ActividadeTarefaTiposComponent, 
     ActividadeTarefaHistoricosComponent, 
     ActividadeGestorUsersComponent, ActividadeMinhasTarefasComponent, ActividadeConfiguracaoComponent, ActividadeTarefasNewComponent, ActividadeComentariosComponent, ActividadesNewComponent, FuncionarioComponent, CategoriasComponent,

     
  ],
  imports: [
    CommonModule, 
    
    ReactiveFormsModule,
    FormsModule,
    ActividadeRoutingModule,
    ModalModule.forRoot(), 
    PaginationModule.forRoot(),
    CommonModule,
 

    UIModule,
    WidgetModule,
    UIModule,

    ModalModule,
 
    NgSelectModule,
    BsDropdownModule,

    AlertModule.forRoot(),
    SlickCarouselModule,
    NgxPaginationModule,
    NgApexchartsModule,
    TooltipModule.forRoot(),

  ]
})
export class ActividadeModule { }
