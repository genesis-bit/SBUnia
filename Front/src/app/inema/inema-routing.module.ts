import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OcorrenciasComponent } from "./ocorrencias/ocorrencias.component";
import { EstadosComponent } from "./estados/estados.component";
import { OcorrenciasAtividadesTipoComponent } from "./ocorrencias-atividades-tipo/ocorrencias-atividades-tipo.component";
import { OcorrenciasAtividadesComponent } from "./ocorrencias-atividades/ocorrencias-atividades.component";
import { OcorrenciasTipoComponent } from "./ocorrencias-tipo/ocorrencias-tipo.component";
import { PessoasComponent } from "./pessoas/pessoas.component";
import { ProdutosComponent } from "./produtos/produtos.component";
import { ProvinciasComponent } from "./provincias/provincias.component";
import { SituacoesComponent } from "./situacoes/situacoes.component";
import { OcorrenciaConfiguracaoComponent } from "./ocorrencia-configuracao/ocorrencia-configuracao.component";
import { LocalSolicitacaoComponent } from "./local-solicitacao/local-solicitacao.component";
import { ViaTransmissaoComponent } from "./via-transmissao/via-transmissao.component";
import { BaseAreaComponent } from "./base-area/base-area.component";
import { BaseEstruturaComponent } from "./base-estrutura/base-estrutura.component";


const routes: Routes = [
  
  {
    path: "ocorrencias",
    component: OcorrenciasComponent,
  },
  {
    path: "estados",
    component: EstadosComponent,
  },
  {
    path: "ocorrencias-atividades-tipo",
    component: OcorrenciasAtividadesTipoComponent,
  },
  {
    path: "ocorrencias-atividades",
    component: OcorrenciasAtividadesComponent,
  },
  {
    path: "ocorrencias-tipo",
    component: OcorrenciasTipoComponent,
  },
  {
    path: "pessoas",
    component: PessoasComponent,
  },
  {
    path: "produtos",
    component: ProdutosComponent,
  },
  {
    path: "provincias",
    component: ProvinciasComponent,
  },
  {
    path: "situacoes",
    component: SituacoesComponent,
  },

  {
    path: "ocorrencia-configuracao",
    component: OcorrenciaConfiguracaoComponent,
  },
  {
    path: "local-solicitacao",
    component: LocalSolicitacaoComponent,
  },

  {
    path: "ocorrencia-configuracao",
    component: OcorrenciaConfiguracaoComponent,
  },
  {
    path: "via-transmissao",
    component: ViaTransmissaoComponent,
  },
  {
    path: "base-area",
    component: BaseAreaComponent,
  },
  {
    path: "base-estrutura",
    component: BaseEstruturaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InemaRoutingModule {}
