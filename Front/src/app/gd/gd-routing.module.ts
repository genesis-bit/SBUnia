import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClassificacaoComponent } from "./classificacao/classificacao.component";
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
import { Atividade } from "./model/atividade";
import { AtividadeComponent } from "./atividade/atividade.component";
import { DocumentoEstadoComponent } from "./documento-estado/documento-estado.component";
import { OrdemReferenciaComponent } from "./ordem-referencia/ordem-referencia.component";
import { CorrespondenciaExpedicaoComponent } from "./correspondencia-expedicao/correspondencia-expedicao.component";
import { CorrespondenciaEstadosComponent } from "./correspondencia-estados/correspondencia-estados.component";
import { CorrespondenciaRegistoComponent } from "./correspondencia-registo/correspondencia-registo.component";
import { CorrespondenciaClassificacaoComponent } from "./correspondencia-classificacao/correspondencia-classificacao.component";
import { GdConfiguracaoComponent } from "./gd-configuracao/gd-configuracao.component";
import { TramitarDocumentoDespachoComponent } from "./tramitar-documento-despacho/tramitar-documento-despacho.component";
import { DocumentoPorAreaComponent } from "./documento-por-area/documento-por-area.component";
import { EditarDocumentoPorAreaComponent } from "./editar-documento-por-area/editar-documento-por-area.component";
import { DocumentosSituacaoComponent } from "./documentos-situacao/documentos-situacao.component";
import { VerDocumentoSituacaoComponent } from "./ver-documento-situacao/ver-documento-situacao.component";
import { TramitacaoDetalhesComponent } from "./tramitacao-detalhes/tramitacao-detalhes.component";
import { EntidadeComponent } from "./entidade/entidade.component";

const routes: Routes = [
  {
    path: "classificacao",
    component: CorrespondenciaClassificacaoComponent,
  },
  {
    path: "registo",
    component: CorrespondenciaRegistoComponent,
  },
  {
    path: "documentos-situacao",
    component: DocumentosSituacaoComponent,
  },
  {
    path: "ver-documento-situacao/:code",
    component: VerDocumentoSituacaoComponent,
  },

  {
    path: "correspondencia-documentos",
    component: CorrespondenciaEstadosComponent,
  },
  {
    path: "expedicao",
    component: CorrespondenciaExpedicaoComponent,
  },

  {
    path: "registar-documento/:code",
    component: RegistarDocumentoComponent,
  },

  {
    path: "tramitacao",
    component: TramitacaoComponent,
  },
  {
    path: "entidade",
    component: EntidadeComponent,
  },

  {
    path: "tramitacao-detalhes/:code",
    component: TramitacaoDetalhesComponent,
  },

  {
    path: "tramitacao-despacho/:code",
    component: TramitarDocumentoDespachoComponent,
  },

  {
    path: "documentos-por-area",
    component: DocumentoPorAreaComponent,
  },

  {
    path: "editar-documentos-por-area/:code",
    component: EditarDocumentoPorAreaComponent,
  },

  {
    path: "tramitar-documento/:code",
    component: TramitarDocumentoComponent,
  },
  {
    path: "tipo-documento",
    component: TipoDocumentoComponent,
  },
  {
    path: "acesso-documento",
    component: AcessoDocumentoComponent,
  },
  {
    path: "prioridade-documento",
    component: PrioridadeDocumentoComponent,
  },
  {
    path: "via-transmissao-documento",
    component: ViaTransmissaoDocumentoComponent,
  },
  {
    path: "estado",
    component: EstadoComponent,
  },
  {
    path: "documento-entidade-acreditada",
    component: DocumentoEntidadeAcreditadaComponent,
  },
  {
    path: "documento-atividade",
    component: DocumentoAtividadeComponent,
  },
  {
    path: "documento-despacho",
    component: DocumentoDespachoComponent,
  },
  {
    path: "documento-comunicacao",
    component: DocumentoComunicacaoComponent,
  },
  {
    path: "atividade",
    component: AtividadeComponent,
  },
  {
    path: "documento-estado",
    component: DocumentoEstadoComponent,
  },
  {
    path: "ordem-referencia",
    component: OrdemReferenciaComponent,
  },
  {
    path: "gd-configuracao",
    component: GdConfiguracaoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GdRoutingModule {}
