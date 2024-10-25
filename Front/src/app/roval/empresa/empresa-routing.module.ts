import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { EmpresasComponent } from './empresas/empresas.component';
import { TipoEmpresasComponent } from './tipo-empresas/tipo-empresas.component';
import { UsersEmpresasComponent } from './users-empresas/users-empresas.component';
 
const routes: Routes = [
    {
        path: 'gerir-empresas',
        component: EmpresasComponent
    },
    {
        path: 'tipo-empresas',
        component: TipoEmpresasComponent
    },
    {
        path: 'gerir-users',
        component: UsersEmpresasComponent
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpresaRoutingModule { }
 