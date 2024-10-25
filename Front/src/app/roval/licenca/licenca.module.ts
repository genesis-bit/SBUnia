import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap/alert';
// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UIModule } from '../../shared/ui/ui.module'; 
import { LicencaRoutingModule } from './licenca-routing';
import { LicencasComponent } from './licencas/licencas.component';
import { RovalOnlineUsersComponent } from './roval-online-users/roval-online-users.component';
import { RovalSistemasOnlineComponent } from './roval-sistemas-online/roval-sistemas-online.component';
 
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@NgModule({
  declarations: [LicencasComponent,RovalOnlineUsersComponent,RovalSistemasOnlineComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    AlertModule.forRoot(),
    UIModule,
    LicencaRoutingModule,
    SlickCarouselModule, 
    NgSelectModule, 
    BsDropdownModule,
  ]
})
export class LicencaModule { }
