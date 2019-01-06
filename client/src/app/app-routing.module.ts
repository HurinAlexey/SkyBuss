import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {SystemLayoutComponent} from './shared/layouts/system-layout/system-layout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {AuthGuard} from './shared/classes/auth.guard';
import {CategoriesPageComponent} from './categories-page/categories-page.component';
import {ProjectsPageComponent} from './projects-page/projects-page.component';
import {CategoriesFormComponent} from './categories-page/categories-form/categories-form.component';
import {ProjectsFormComponent} from './projects-page/projects-form/projects-form.component';
import {PortfolioPageComponent} from './portfolio-page/portfolio-page.component';
import {ContactsPageComponent} from './contacts-page/contacts-page.component';
import {AboutPageComponent} from './about-page/about-page.component';

const routes: Routes = [
  {path: '', component: SiteLayoutComponent, children: [
      {path: '', component: HomePageComponent},
      {path: 'portfolio', component: PortfolioPageComponent},
      {path: 'portfolio/:id', component: PortfolioPageComponent},
      {path: 'contacts', component: ContactsPageComponent},
      {path: 'about', component: AboutPageComponent}
    ]
  },
  {path: 'login', component: LoginPageComponent},
  {path: '', component: SystemLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'categories', component: CategoriesPageComponent},
      {path: 'categories/new', component: CategoriesFormComponent},
      {path: 'categories/:id', component: CategoriesFormComponent},
      {path: 'projects', component: ProjectsPageComponent},
      {path: 'projects/category/:id', component: ProjectsPageComponent},
      {path: 'projects/new', component: ProjectsFormComponent},
      {path: 'projects/:id', component: ProjectsFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
