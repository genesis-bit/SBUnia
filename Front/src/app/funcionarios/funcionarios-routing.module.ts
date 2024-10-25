import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { EquipaComponent } from './equipa/equipa.component';
import { RhCategoriaComponent } from './rh-categoria/rh-categoria.component';
import { EscalaComponent } from './escala/escala.component';
import { RhConfiguracaoComponent } from './rh-configuracao/rh-configuracao.component';

const routes: Routes = [
  {
    path:"funcionarios",
    component: FuncionarioComponent
  },
  {
    path:"equipas",
    component: EquipaComponent
  },
  {
    path:"categorias",
    component: RhCategoriaComponent
  },
  {
    path:"escala",
    component: EscalaComponent
  },
  {
    path:"rhconfiguracao",
    component: RhConfiguracaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
