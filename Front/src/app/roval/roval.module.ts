import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RovalRoutingModule } from "./roval-routing.module";
import { LicencaModule } from "./licenca/licenca.module";
import { AgenteModule } from "./agente/agente.module";
import { ModalModule } from "ngx-bootstrap/modal";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { EmpresaModule } from "./empresa/empresa.module";
//  import { PortalNoticiasComponent } from './portal/portal-noticias/portal-noticias.component';
// import { PortalEventosComponent } from './portal/portal-eventos/portal-eventos.component';
// import { PortalNoticiaDetalhesComponent } from './portal/portal-noticia-detalhes/portal-noticia-detalhes.component';
// import { PortalHistorialComponent } from './portal/portal-historial/portal-historial.component';
// import { PortalContactosComponent } from './portal/portal-contactos/portal-contactos.component';
// import { PortalNewslettersComponent } from './portal/portal-newsletters/portal-newsletters.component';
// import { PortalCeoDescursosComponent } from './portal/portal-ceo-descursos/portal-ceo-descursos.component';
// import { PortalPerguntasFrequentesComponent } from './portal/portal-perguntas-frequentes/portal-perguntas-frequentes.component';
// import { PortalTestemunhosComponent } from './portal/portal-testemunhos/portal-testemunhos.component';
// import { PortalSobreComponent } from './portal/portal-sobre/portal-sobre.component';

@NgModule({
  declarations: [
    // PortalNoticiasComponent,
    // PortalEventosComponent,
    // PortalNoticiaDetalhesComponent,
    // PortalHistorialComponent,
    // PortalContactosComponent,
    // PortalNewslettersComponent,
    // PortalCeoDescursosComponent,
    // PortalPerguntasFrequentesComponent,
    // PortalTestemunhosComponent,
    // PortalSobreComponent,
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    RovalRoutingModule,
    // LicencaModule,
    // AgenteModule,
    // EmpresaModule,
    PaginationModule.forRoot(),
  ],
})
export class rovalModule {}
