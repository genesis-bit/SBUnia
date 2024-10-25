import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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

import { InemaRoutingModule } from "./inema-routing.module";
import { OcorrenciasComponent } from "./ocorrencias/ocorrencias.component";
import { EstadosComponent } from "./estados/estados.component";
import { OcorrenciasAtividadesTipoComponent } from "./ocorrencias-atividades-tipo/ocorrencias-atividades-tipo.component";
import { OcorrenciasAtividadesComponent } from "./ocorrencias-atividades/ocorrencias-atividades.component";
import { OcorrenciasTipoComponent } from "./ocorrencias-tipo/ocorrencias-tipo.component";
import { PessoasComponent } from "./pessoas/pessoas.component";
import { ProdutosComponent } from "./produtos/produtos.component";
import { ProvinciasComponent } from "./provincias/provincias.component";
import { SituacoesComponent } from "./situacoes/situacoes.component";
 import { LocalSolicitacaoComponent } from './local-solicitacao/local-solicitacao.component';
import { OcorrenciaConfiguracaoComponent } from './ocorrencia-configuracao/ocorrencia-configuracao.component';
import { ViaTransmissaoComponent } from './via-transmissao/via-transmissao.component';
import { BaseAreaComponent } from './base-area/base-area.component';
import { BaseEstruturaComponent } from './base-estrutura/base-estrutura.component';



@NgModule({
  declarations: [
    OcorrenciasComponent,
    EstadosComponent,
    OcorrenciasAtividadesTipoComponent,
    OcorrenciasAtividadesComponent,
    OcorrenciasTipoComponent,
    PessoasComponent,
    ProdutosComponent,
    ProvinciasComponent,
    SituacoesComponent,
    LocalSolicitacaoComponent,
    OcorrenciaConfiguracaoComponent,
    ViaTransmissaoComponent,
    BaseAreaComponent,
    BaseEstruturaComponent,

  ],
  imports: [CommonModule, InemaRoutingModule,     ReactiveFormsModule,
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
    ModalModule,],
})
export class InemaModule {}
