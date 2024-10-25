import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {   OcorrenciaRoutingModule } from "./ocorrencia-routing.module"; 
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AlertModule } from "ngx-bootstrap/alert";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { UIModule } from "../shared/ui/ui.module";
import { NgxPaginationModule } from "ngx-pagination";
import { NgApexchartsModule } from "ng-apexcharts";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgSelectModule } from "@ng-select/ng-select";
import { WidgetModule } from "../shared/widget/widget.module";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { RelatorioOcorrenciasComponent } from './relatorio-ocorrencias/relatorio-ocorrencias.component'; 
import { OcorrenciasComponent } from "./ocorrencias/ocorrencias.component";
import { OcorrenciasEstadosComponent } from './ocorrencias-estados/ocorrencias-estados.component';
import { OcorrenciasHistoricoComponent } from './ocorrencias-historico/ocorrencias-historico.component';
import { OcorrenciasTiposComponent } from './ocorrencias-tipos/ocorrencias-tipos.component';
import { OcorrenciasSituacaoComponent } from './ocorrencias-situacao/ocorrencias-situacao.component';
import { OcorrenciasViaTransmissaoComponent } from './ocorrencias-via-transmissao/ocorrencias-via-transmissao.component';
import { OcorrenciasActividadeComponent } from './ocorrencias-actividade/ocorrencias-actividade.component';
import { OcorrenciasActividadeItemComponent } from './ocorrencias-actividade-item/ocorrencias-actividade-item.component';
import { OcorrenciasActividadeTipoComponent } from './ocorrencias-actividade-tipo/ocorrencias-actividade-tipo.component';
import { OcorrenciasEquipaComponent } from './ocorrencias-equipa/ocorrencias-equipa.component';
import { OcorrenciasLocalSolicitacaoComponent } from './ocorrencias-local-solicitacao/ocorrencias-local-solicitacao.component';
import { OcorrenciasConfiguracaoComponent } from './ocorrencias-configuracao/ocorrencias-configuracao.component';
import { OcorrenciaPreRegistoComponent } from './ocorrencia-pre-registo/ocorrencia-pre-registo.component';

@NgModule({
  declarations: [
  OcorrenciasComponent,
  
    RelatorioOcorrenciasComponent,
        OcorrenciasEstadosComponent,
        OcorrenciasHistoricoComponent,
        OcorrenciasTiposComponent,
        OcorrenciasSituacaoComponent,
        OcorrenciasViaTransmissaoComponent,
        OcorrenciasActividadeComponent,
        OcorrenciasActividadeItemComponent,
        OcorrenciasActividadeTipoComponent,
        OcorrenciasEquipaComponent,
        OcorrenciasLocalSolicitacaoComponent,
        OcorrenciasConfiguracaoComponent,
        OcorrenciaPreRegistoComponent,

  ],
  imports: [
    CommonModule,
    OcorrenciaRoutingModule,

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
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule,
    ModalModule,
  ],
})
export class OcorrenciaModule { }
