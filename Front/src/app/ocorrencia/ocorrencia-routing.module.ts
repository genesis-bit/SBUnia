import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OcorrenciasComponent } from "./ocorrencias/ocorrencias.component";
import { RelatorioOcorrenciasComponent } from "./relatorio-ocorrencias/relatorio-ocorrencias.component";
import { OcorrenciasViaTransmissaoComponent } from "./ocorrencias-via-transmissao/ocorrencias-via-transmissao.component";
import { OcorrenciasLocalSolicitacaoComponent } from "./ocorrencias-local-solicitacao/ocorrencias-local-solicitacao.component";
import { OcorrenciasActividadeTipoComponent } from "./ocorrencias-actividade-tipo/ocorrencias-actividade-tipo.component";
import { OcorrenciasActividadeComponent } from "./ocorrencias-actividade/ocorrencias-actividade.component";
import { OcorrenciasTiposComponent } from "./ocorrencias-tipos/ocorrencias-tipos.component";
import { OcorrenciaPreRegistoComponent } from "./ocorrencia-pre-registo/ocorrencia-pre-registo.component";
import { OcorrenciaConfiguracaoComponent } from "../inema/ocorrencia-configuracao/ocorrencia-configuracao.component";

 

const routes: Routes = [

  {
    path: "pre-registo-ocorrencias",
    component: OcorrenciaPreRegistoComponent,
  },
  {
    path: "ocorrencias",
    component: OcorrenciasComponent,
  },
  {
    path: "relatorio-ocorrencia",
    component: RelatorioOcorrenciasComponent,
  },
  {
    path: "tipo-ocorrencia",
    component: OcorrenciasTiposComponent,
  },
  {
    path: "ocorrencia-actividade",
    component: OcorrenciasActividadeComponent,
  },
  {
    path: "ocorrencia-actividade-tipo",
    component: OcorrenciasActividadeTipoComponent,
  },
  {
    path: "ocorrencia-local",
    component: OcorrenciasLocalSolicitacaoComponent,
  },
  {
    path: "ocorrencia-via-tranmissao",
    component: OcorrenciasViaTransmissaoComponent,
  },
 
  {
    path: "ocorrencia-configuracao",
    component: OcorrenciaConfiguracaoComponent,
  },



  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OcorrenciaRoutingModule {}
