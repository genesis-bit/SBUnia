import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { AgentesComponent } from './agentes/agentes.component';
import { TipoAgentesComponent } from './tipo-agentes/tipo-agentes.component';
 
const routes: Routes = [
    {
        path: 'gerir-agentes',
        component: AgentesComponent
    },
    {
        path: 'tipo-agentes',
        component: TipoAgentesComponent
    },
   
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class  AgenteRoutingModule { }
