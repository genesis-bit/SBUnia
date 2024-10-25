import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./core/guards/auth.guard";
import { LayoutComponent } from "./layouts/layout.component";
import { TemplateComponent } from "./template/template.component";
import { CyptolandingComponent } from "./cyptolanding/cyptolanding.component";
import { Page404Component } from "./extrapages/page404/page404.component";

// import { LayoutState } from '../store/layouts/layouts.reducer'; layout state inicial
const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./account/account.module").then((m) => m.AccountModule),
  },
  {
    path: "",
    component: LayoutComponent,
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
    canActivate: [AuthGuard],
  },
  {
    path: "autenticar",
    //component: LayoutComponent,
    loadChildren: () =>
      import("./autenticar/autenticar.module").then((m) => m.AutenticarModule),
    canActivate: [AuthGuard],
  },
  {
    path: "home",
    component: TemplateComponent,
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: "visita",
    component: LayoutComponent,
    loadChildren: () =>
      import("./visita/visita.module").then((m) => m.VisitaModule),
    canActivate: [AuthGuard],
  },
  {
    path: "correspondencia",
    component: LayoutComponent,
    loadChildren: () =>
      import("./correspondencia/correspondencia.module").then((m) => m.CorrespondenciaModule),
    canActivate: [AuthGuard],
  },
  {
    path: "dashboard",
    component: LayoutComponent,
    loadChildren: () =>
      import("./dashboards/dashboard.module").then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: "pages",
    loadChildren: () =>
      import("./extrapages/extrapages.module").then((m) => m.ExtrapagesModule),
    canActivate: [AuthGuard],
  },
  { path: "crypto-ico-landing", component: CyptolandingComponent },
  {
    path: "admin",
    component: LayoutComponent,
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: "roval",
    component: LayoutComponent,
    loadChildren: () =>
      import("./roval/roval.module").then((m) => m.rovalModule),
    canActivate: [AuthGuard],
  },
  {
    path: "gd",
    component: LayoutComponent,
    loadChildren: () => import("./gd/gd.module").then((m) => m.GdModule),
    canActivate: [AuthGuard],
  },
  {
    path: "inema",
    component: LayoutComponent,
    loadChildren: () =>
      import("./inema/inema.module").then((m) => m.InemaModule),
    canActivate: [AuthGuard],
  },
    {
    path: "patrimonio",
    component: LayoutComponent,
    loadChildren: () =>
      import("./patrimonio/patrimonio.module").then((m) => m.PatrimonioModule),
    canActivate: [AuthGuard],
  },
  {
    path: "funcionarios",
    component: LayoutComponent,
    loadChildren: () =>
      import("./funcionarios/funcionarios.module").then(
        (m) => m.FuncionariosModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "portal",
    component: LayoutComponent,
    loadChildren: () =>
      import("./portal/portal.module").then((m) => m.PortalModule),
    canActivate: [AuthGuard],
  },
  {
    path: "actividade",
    component: LayoutComponent,
    loadChildren: () =>
      import("./actividade/actividade.module").then((m) => m.ActividadeModule),
    canActivate: [AuthGuard],
  },
  {
    path: "ocorrencia",
    component: LayoutComponent,
    loadChildren: () =>
      import("./ocorrencia/ocorrencia.module").then((m) => m.OcorrenciaModule),
    canActivate: [AuthGuard],
  },
  { path: "**", component: Page404Component },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
