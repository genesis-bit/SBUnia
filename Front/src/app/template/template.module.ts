import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SimplebarAngularModule } from 'simplebar-angular';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { UIModule } from '../shared/ui/ui.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';

import { HorizontalComponent } from './horizontal/horizontal.component';
import { VerticalComponent } from './vertical/vertical.component';
import { HorizontaltopbarComponent } from './horizontaltopbar/horizontaltopbar.component';
import { LanguageService } from '../core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { TemplateComponent } from './template.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
 // tslint:disable-next-line: max-line-length
 declarations: [SidebarComponent, TopbarComponent, FooterComponent, HorizontalComponent, VerticalComponent, HorizontaltopbarComponent, TemplateComponent],
 imports: [
   CommonModule,
   TranslateModule,
   RouterModule,
   BsDropdownModule.forRoot(),
   // UIModule,
   SimplebarAngularModule,

   ReactiveFormsModule,
   CdkStepperModule,
   NgStepperModule,
 ],
 providers: [LanguageService]
})
export class TemplateModule { }
