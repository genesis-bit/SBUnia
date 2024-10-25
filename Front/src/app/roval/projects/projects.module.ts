import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectsRoutingModule } from "./projects-routing.module";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AlertModule } from "ngx-bootstrap/alert";

import { SlickCarouselModule } from "ngx-slick-carousel";
import { UIModule } from "../../shared/ui/ui.module";
import { NgxPaginationModule } from "ngx-pagination";

import { NgApexchartsModule } from "ng-apexcharts";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgSelectModule } from "@ng-select/ng-select";
import { WidgetModule } from "../../shared/widget/widget.module";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import { ProjectsComponent } from "./projects/projects.component";
import { NewProjectComponent } from "./new-project/new-project.component";
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";

@NgModule({
  declarations: [
    ProjectsComponent,
    NewProjectComponent,
    TaskComponent,
    NewTaskComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,

    AlertModule.forRoot(),
    SlickCarouselModule,
    NgxPaginationModule,

    WidgetModule,
    UIModule,
    NgSelectModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule,
    ModalModule,
  ],
})
export class ProjectsModule {}
