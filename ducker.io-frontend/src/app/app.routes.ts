import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarIndexComponent } from './calendar/calendar-index/calendar-index.component';
import { PagesIndexComponent } from './pages/pages-index/pages-index.component';
import { PagesComponent } from './pages/pages.component';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
   { path: '',  component: HomeComponent  },
  // { path: '', redirectTo: '/calendar/2017-04-14', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'calendar', children: [
    { path: '', component: CalendarIndexComponent },
    { path: 'tag/:slug', component: CalendarIndexComponent },
    { path: 'item/:slug', component: CalendarComponent }
  ]}, 
  { path: 'pages', children: [
    { path: '', component: PagesIndexComponent },
    // { path: 'tag/:slug', component: CalendarIndexComponent },
     { path: 'item/:slug', component: PagesComponent }
  ]}, 
  { path: 'links', loadChildren: './+links#LinksModule'},
  { path: '**',    component: NoContentComponent },
];
