import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProjectsComponent } from "./projects/projects.component";
import { NewProjectComponent } from "./new-project/new-project.component";
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";

const routes: Routes = [
  {
    path: "projectos",
    component: ProjectsComponent,
  },
  {
    path: "novo-projecto",
    component: NewProjectComponent,
  },
  {
    path: "tarefas",
    component: TaskComponent,
  },
  {
    path: "nova-tarefa",
    component: NewTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class ProjectsRoutingModule {}
