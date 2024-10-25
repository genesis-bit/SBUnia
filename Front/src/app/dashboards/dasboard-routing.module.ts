import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyDashboardComponent } from "./my-dashboard/my-dashboard.component";
import { DashboardAreaComponent } from "./dashboard-area/dashboard-area.component";
 
const routes: Routes = [
  {
    path: "home",
    component: MyDashboardComponent,
  },
  {
    path: "my-dasboard",
    component: MyDashboardComponent,
  },
  {
    path: "dashboard-area",
    component: DashboardAreaComponent,
  },

  {
    path: "dasboard-desempenho",
    component: DashboardAreaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
