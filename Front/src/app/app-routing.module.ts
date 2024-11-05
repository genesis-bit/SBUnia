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
      import("./home/home.module").then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: "autenticar",
    loadChildren: () =>
      import("./autenticar/autenticar.module").then((m) => m.AutenticarModule),
  },
  {
    path: "home",
    component: TemplateComponent,
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomeModule),
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
  { path: "**", component: Page404Component },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
