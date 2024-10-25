import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { RovalSistemasOnlineComponent } from './roval-sistemas-online/roval-sistemas-online.component';
import { RovalOnlineUsersComponent } from './roval-online-users/roval-online-users.component';
import { LicencasComponent } from './licencas/licencas.component';

const routes: Routes = [
    {
        path: 'gerir-licencas',
        component: LicencasComponent
    },
    {
        path: 'roval-online',
        component: RovalSistemasOnlineComponent
    },
    {
        path: 'roval-users',
        component: RovalOnlineUsersComponent
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LicencaRoutingModule { }
