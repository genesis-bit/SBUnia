import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "licenca",
    loadChildren: () =>
      import("./licenca/licenca.module").then((m) => m.LicencaModule),
  },
  {
    path: "agente",
    loadChildren: () =>
      import("./agente/agente.module").then((m) => m.AgenteModule),
  },

  {
    path: "empresa",
    loadChildren: () =>
      import("./empresa/empresa.module").then((m) => m.EmpresaModule),
  },
 
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RovalRoutingModule {}
