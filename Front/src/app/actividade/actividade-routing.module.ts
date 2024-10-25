import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ActividadesComponent } from "./actividades/actividades.component";
import { ActividadeTarefasComponent } from "./actividade-tarefas/actividade-tarefas.component";
import { ActividadeDetalhesComponent } from "./actividade-detalhes/actividade-detalhes.component";
import { ActividadeMinhasTarefasComponent } from "./actividade-minhas-tarefas/actividade-minhas-tarefas.component";
import { ActividadeConfiguracaoComponent } from "./actividade-configuracao/actividade-configuracao.component";
import { ActividadeTarefaEstadosComponent } from "./actividade-tarefa-estados/actividade-tarefa-estados.component";
import { ActividadeTarefaTiposComponent } from "./actividade-tarefa-tipos/actividade-tarefa-tipos.component";
import { ActividadeTiposComponent } from "./actividade-tipos/actividade-tipos.component";
import { ActividadeTarefaHistoricosComponent } from "./actividade-tarefa-historicos/actividade-tarefa-historicos.component";
import { ActividadeGestorUsersComponent } from "./actividade-gestor-users/actividade-gestor-users.component";
import { ActividadeTarefasNewComponent } from "./actividade-tarefas-new/actividade-tarefas-new.component";
import { ActividadeComentariosComponent } from "./actividade-comentarios/actividade-comentarios.component";
import { ActividadeAreasComponent } from "./actividade-areas/actividade-areas.component";
import { ActividadesNewComponent } from "./actividades-new/actividades-new.component";
import { FuncionarioComponent } from "./funcionario/funcionario.component";
import { CategoriasComponent } from "./categorias/categorias.component";


const routes: Routes = [ 

  {
    path: "actividades",
    component: ActividadesNewComponent,
  },
  {
    path: "minhas-tarefas",
    component: ActividadeMinhasTarefasComponent,
  },

  {
    path: "tarefas",
    component: ActividadeTarefasNewComponent,
  },

  {
    path: "actividade-detalhes/:id",
    component: ActividadeDetalhesComponent,
  },
  {
    path: "actividade-configuracao",
    component: ActividadeConfiguracaoComponent,
  },
  {
    path: "actividade-tarefa-estado",
    component: ActividadeTarefaEstadosComponent,
  },
  {
    path: "actividade-tarefa-tipo",
    component: ActividadeTarefaTiposComponent,
  },
  {
    path: "actividade-tipo",
    component: ActividadeTiposComponent,
  },
  {
    path: "actividade-tarefa-historico/:code",
    component: ActividadeTarefaHistoricosComponent,
  },
  {
    path: "actividade-gestor-user",
    component: ActividadeGestorUsersComponent,
  },
  {
    path: "actividade-comentario/:code",
    component: ActividadeComentariosComponent,
  },
  {
    path: "actividade-area",
    component: ActividadeAreasComponent
  },
  {
    path: "actividade-detalhe/:code",
    component: ActividadeDetalhesComponent
  },
  {
    path: "categoria",
    component: CategoriasComponent
  },
  {
    path: "funcionario",
    component: FuncionarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadeRoutingModule {}
