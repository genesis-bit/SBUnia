import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GdRoutingModule } from "./gd-routing.module";
import { ClassificacaoComponent } from "./classificacao/classificacao.component";
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
import { RegistarDocumentoComponent } from "./registar-documento/registar-documento.component";
import { TramitacaoComponent } from "./tramitacao/tramitacao.component";
import { TramitarDocumentoComponent } from "./tramitar-documento/tramitar-documento.component";
import { TipoDocumentoComponent } from "./tipo-documento/tipo-documento.component";
import { AcessoDocumentoComponent } from "./acesso-documento/acesso-documento.component";
import { PrioridadeDocumentoComponent } from "./prioridade-documento/prioridade-documento.component";
import { ViaTransmissaoDocumentoComponent } from "./via-transmissao-documento/via-transmissao-documento.component";
import { EstadoComponent } from "./estado/estado.component";
import { DocumentoEntidadeAcreditadaComponent } from "./documento-entidade-acreditada/documento-entidade-acreditada.component";
import { DocumentoAtividadeComponent } from "./documento-atividade/documento-atividade.component";
import { DocumentoDespachoComponent } from "./documento-despacho/documento-despacho.component";
import { DocumentoComunicacaoComponent } from "./documento-comunicacao/documento-comunicacao.component";
import { AtividadeComponent } from "./atividade/atividade.component";
import { DocumentoEstadoComponent } from "./documento-estado/documento-estado.component";
import { OrdemReferenciaComponent } from "./ordem-referencia/ordem-referencia.component";
import { CorrespondenciaClassificacaoComponent } from "./correspondencia-classificacao/correspondencia-classificacao.component";
import { CorrespondenciaRegistoComponent } from "./correspondencia-registo/correspondencia-registo.component";
import { CorrespondenciaExpedicaoComponent } from "./correspondencia-expedicao/correspondencia-expedicao.component";
import { CorrespondenciaEstadosComponent } from "./correspondencia-estados/correspondencia-estados.component";
import { GdConfiguracaoComponent } from "./gd-configuracao/gd-configuracao.component";
import { TramitarDocumentoDespachoComponent } from "./tramitar-documento-despacho/tramitar-documento-despacho.component";
import { DocumentoPorAreaComponent } from "./documento-por-area/documento-por-area.component";
import { EditarDocumentoPorAreaComponent } from "./editar-documento-por-area/editar-documento-por-area.component";
import { DocumentosSituacaoComponent } from "./documentos-situacao/documentos-situacao.component";
import { VerDocumentoSituacaoComponent } from "./ver-documento-situacao/ver-documento-situacao.component";
import { TramitacaoDetalhesComponent } from "./tramitacao-detalhes/tramitacao-detalhes.component";
import { NgxSliderModule } from "ngx-slider-v2";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { PopoverModule } from "ngx-bootstrap/popover";
import { TabsModule } from "ngx-bootstrap/tabs";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { RatingModule } from "ngx-bootstrap/rating";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ImageCropperModule } from "ngx-image-cropper";
import { NgxMasonryModule } from "ngx-masonry";
import { EntidadeComponent } from "./entidade/entidade.component";

@NgModule({
  declarations: [
    DocumentosSituacaoComponent,
    EntidadeComponent,
    EditarDocumentoPorAreaComponent,
    VerDocumentoSituacaoComponent,
    DocumentoPorAreaComponent,
    ClassificacaoComponent,
    RegistarDocumentoComponent,
    TramitacaoComponent,
    TramitarDocumentoComponent,
    TipoDocumentoComponent,
    AcessoDocumentoComponent,
    PrioridadeDocumentoComponent,
    ViaTransmissaoDocumentoComponent,
    EstadoComponent,
    DocumentoEntidadeAcreditadaComponent,
    DocumentoAtividadeComponent,
    DocumentoDespachoComponent,
    DocumentoComunicacaoComponent,
    AtividadeComponent,
    DocumentoEstadoComponent,
    OrdemReferenciaComponent,
    CorrespondenciaClassificacaoComponent,
    CorrespondenciaRegistoComponent,
    CorrespondenciaExpedicaoComponent,
    CorrespondenciaEstadosComponent,
    GdConfiguracaoComponent,
    TramitarDocumentoDespachoComponent,
    TramitacaoDetalhesComponent,
  ],
  imports: [
    CommonModule,
    GdRoutingModule,

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

    NgxSliderModule,
    ProgressbarModule.forRoot(),
    PopoverModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    RatingModule.forRoot(),
    CarouselModule.forRoot(),
    ImageCropperModule,
    NgxMasonryModule,
  ],
})
export class GdModule {}
