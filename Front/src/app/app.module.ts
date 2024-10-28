import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  APP_BASE_HREF,
  HashLocationStrategy,
  LocationStrategy,
  DatePipe,
} from "@angular/common";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";

import { ErrorInterceptor } from "./core/helpers/error.interceptor";

import { NgxSpinnerModule } from "ngx-spinner";

import { ApiInterceptor } from "./HttpInterceptors/ApiInterceptor";

import { environment } from "../environments/environment";

// Swiper Slider
import { SlickCarouselModule } from "ngx-slick-carousel";
// bootstrap component
import { TabsModule } from "ngx-bootstrap/tabs";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { ToastrModule } from "ngx-toastr";
import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";
import { SharedModule } from "./cyptolanding/shared/shared.module";

// Store
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
// Page Route
import { ExtrapagesModule } from "./extrapages/extrapages.module";
import { LayoutsModule } from "./layouts/layouts.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { initFirebaseBackend } from "./authUtils";
import { CyptolandingComponent } from "./cyptolanding/cyptolanding.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

// Auth
import { JwtInterceptor } from "./core/helpers/jwt.interceptor";
import { FakeBackendInterceptor } from "./core/helpers/fake-backend";
import { FilemanagerEffects } from "./store/filemanager/filemanager.effects";
import { rootReducer } from "./store";
import { OrderEffects } from "./store/orders/order.effects";
import { AuthenticationEffects } from "./store/Authentication/authentication.effects";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { CartEffects } from "./store/Cart/cart.effects";
import { ProjectEffects } from "./store/ProjectsData/project.effects";
import { usersEffects } from "./store/UserGrid/user.effects";
import { userslistEffects } from "./store/UserList/userlist.effect";
import { JoblistEffects } from "./store/Job/job.effects";
import { CandidateEffects } from "./store/Candidate/candidate.effects";
import { InvoiceDataEffects } from "./store/Invoices/invoice.effects";
import { ChatEffects } from "./store/Chat/chat.effect";
import { tasklistEffects } from "./store/Tasks/tasks.effect";
import { OrdersEffects } from "./store/Crypto/crypto.effects";
import { CustomerEffects } from "./store/customer/customer.effects";
import { MailEffects } from "./store/Email/email.effects";

import { NgxPaginationModule } from "ngx-pagination";
import { Auth2Service } from "./core/services/auth2.service";
import { GeneralService } from "./core/services/general.service";
import { GeneralConstants } from "./core/constants/GeneralConstants";
import { NotificationService } from "./core/services/notification.service";
import { ValidationService } from "./core/services/validation.service";

import { WebsocketService } from "./core/services/websocket.service";
import { PdfService } from "./core/services/pdf.service";
import { zebraPrint } from "./core/services/zebraPrint.service";
import { PessoasComponent } from "./base/pessoas/pessoas.component";
import { ProvinciasComponent } from "./endereco/provincias/provincias.component";
import { PaisesComponent } from "./endereco/paises/paises.component";
import { MunicipiosComponent } from "./endereco/municipios/municipios.component";
import { DistritosComponent } from "./endereco/distritos/distritos.component";
import { BairrosComponent } from "./endereco/bairros/bairros.component";
import { RuasComponent } from "./endereco/ruas/ruas.component";
import { GraficoLogsService } from "./core/services/graficos/graficoLogs.service";

import { AreasComponent } from './base/areas/areas.component';
import { ExcelService } from "./core/services/excel.service";
import { AutenticarModule } from "./autenticar/autenticar.module";
import { HomeModule } from "./home/home.module";
import { TemplateModule } from "./template/template.module";

if (environment.defaultauth === "firebase") {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  // tslint:disable-next-line: no-unused-expression
  FakeBackendInterceptor;
}

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    CyptolandingComponent,
    PessoasComponent,
    ProvinciasComponent,
    PaisesComponent,
    MunicipiosComponent,
    DistritosComponent,
    BairrosComponent,
    RuasComponent,
    AreasComponent,


    //  OcorrenciasComponent, SituacoesComponent, OcorrenciasTipoComponent, EstadosComponent, OcorrenciasAtividadesTipoComponent, OcorrenciasAtividadesComponent, ProdutosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    NgxPaginationModule,
    NgxSpinnerModule,

    AutenticarModule,
    HomeModule,
    TemplateModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    // LayoutsModule,
    AppRoutingModule,
    ExtrapagesModule,
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    SharedModule,
    ScrollToModule.forRoot(),
    SlickCarouselModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([
      FilemanagerEffects,
      OrderEffects,
      AuthenticationEffects,
      CartEffects,
      ProjectEffects,
      usersEffects,
      userslistEffects,
      JoblistEffects,
      CandidateEffects,
      InvoiceDataEffects,
      ChatEffects,
      tasklistEffects,
      OrdersEffects,
      CustomerEffects,
      MailEffects,
    ]),


    // InemaRoutingModule,
    // InemaModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true,
    },

    GraficoLogsService,
    // -my services
    zebraPrint,
    PdfService,
    ExcelService,
    Auth2Service,
    GeneralService,
    GeneralConstants,
    NotificationService,
    ValidationService,
    WebsocketService,
    { provide: APP_BASE_HREF, useValue: "/" },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
})
export class AppModule {}
