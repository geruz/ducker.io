import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarIndexComponent } from './calendar/calendar-index/calendar-index.component';
import { PagesIndexComponent } from './pages/pages-index/pages-index.component';
import { PagesComponent } from './pages/pages.component';
import { NoContentComponent } from './no-content';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guards';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
   { path: '',  component: HomeComponent, canActivate: [ AuthGuard ]  },
  // { path: '', redirectTo: '/calendar/2017-04-14', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'calendar', canActivate: [ AuthGuard ], children: [
    { path: '', component: CalendarIndexComponent },
    { path: 'tag/:slug', component: CalendarIndexComponent },
    { path: 'item/:slug', component: CalendarComponent }
  ]}, 
  { path: 'pages', canActivate: [ AuthGuard ], children: [
    { path: '', component: PagesIndexComponent },
     { path: 'tag/:slug', component: PagesIndexComponent },
     { path: 'item/:slug', component: PagesComponent }
  ]}, 
  { path: 'links', canActivate: [ AuthGuard ], loadChildren: './+links#LinksModule'},
  { path: 'login', component: LoginComponent },
  { path: '**',    component: NoContentComponent },
];
