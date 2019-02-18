import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {SystemLayoutComponent} from './shared/layouts/system-layout/system-layout.component';
import {MnFullpageModule} from 'ngx-fullpage';
import { HomePageComponent } from './home-page/home-page.component';
import {AuthService} from './shared/services/auth.service';
import {AuthGuard} from './shared/classes/auth.guard';
import {TokenInterceptor} from './shared/classes/token.interceptor';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import {CategoriesService} from './shared/services/categories.service';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import {ProjectsService} from './shared/services/projects.service';
import {ProjectsFormComponent} from './projects-page/projects-form/projects-form.component';
import {ParticlesModule} from 'angular-particle';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import {MailService} from './shared/services/mail.service';
import { FullpageNavComponent } from './home-page/fullpage-nav/fullpage-nav.component';
import {OwlModule} from 'ngx-owl-carousel';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { ConsultationFormComponent } from './home-page/consultation-form/consultation-form.component';
import { BriefFormComponent } from './home-page/brief-form/brief-form.component';
import { CallbackFormComponent } from './home-page/callback-form/callback-form.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SiteLayoutComponent,
    SystemLayoutComponent,
    HomePageComponent,
    CategoriesPageComponent,
    ProjectsPageComponent,
    LoaderComponent,
    CategoriesFormComponent,
    ProjectsFormComponent,
    PortfolioPageComponent,
    ContactsPageComponent,
    AboutPageComponent,
    FullpageNavComponent,
    ConsultationFormComponent,
    BriefFormComponent,
    CallbackFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MnFullpageModule.forRoot(),
    ParticlesModule,
    OwlModule,
    PerfectScrollbarModule
  ],
  providers: [
    AuthService,
    CategoriesService,
    ProjectsService,
    MailService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
