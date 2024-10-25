import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AlertModule } from "ngx-bootstrap/alert";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { UIModule } from "../shared/ui/ui.module";
import { NgxPaginationModule } from "ngx-pagination";
import { NgApexchartsModule } from "ng-apexcharts";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgSelectModule } from "@ng-select/ng-select";
import { WidgetModule } from "../shared/widget/widget.module";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import { FuncionarioComponent } from "./funcionario/funcionario.component";
import { EquipaComponent } from "./equipa/equipa.component";

import { FuncionariosRoutingModule } from "./funcionarios-routing.module";
import { EscalaComponent } from './escala/escala.component';
import { RhConfiguracaoComponent } from './rh-configuracao/rh-configuracao.component';
import { RhCategoriaComponent } from './rh-categoria/rh-categoria.component';

@NgModule({
  declarations: [FuncionarioComponent, EquipaComponent, EscalaComponent, RhConfiguracaoComponent, RhCategoriaComponent],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    UIModule,
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
export class FuncionariosModule {}
