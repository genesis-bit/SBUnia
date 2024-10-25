import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DashboardRoutingModule } from './dasboard-routing.module'; 
import { UIModule } from '../shared/ui/ui.module';
import { WidgetModule } from '../shared/widget/widget.module';
 
import { NgApexchartsModule } from 'ng-apexcharts';

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { NgSelectModule } from "@ng-select/ng-select";
import { DashboardAreaComponent } from './dashboard-area/dashboard-area.component';

import { SimplebarAngularModule } from 'simplebar-angular';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';


import { SharedModule } from './my-dashboard/shared/shared.module'
@NgModule({
  declarations: [ 
   DashboardAreaComponent,
   MyDashboardComponent,

     
  ],
  imports: [
    CommonModule, 
    
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
    ModalModule.forRoot(), 
    PaginationModule.forRoot(),
    CommonModule,
 
    TabsModule.forRoot(),

    SimplebarAngularModule,
    UIModule,
    WidgetModule,
    UIModule,

    ModalModule,
 
    NgSelectModule,
    BsDropdownModule,
    
    NgApexchartsModule,
    SharedModule,
  ]
})
export class DashboardModule { }
