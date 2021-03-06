import { Routes } from '@angular/router';
import { HomeComponent } from './home';

import { ReviewsComponent } from './reviews/reviews.component';

import { PagesIndexComponent } from './pages/pages-index/pages-index.component';
import { PagesComponent } from './pages/pages.component';
import { NoContentComponent } from './no-content';

import { DesignLoggerComponent } from './design-logger';
import { LoggerItemComponent } from './design-logger/logger-item';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guards';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
   { path: '',  component: ReviewsComponent, canActivate: [ AuthGuard ]  },

  { path: 'home',  component: HomeComponent, canActivate: [ AuthGuard ] },

  { path: 'pages', canActivate: [ AuthGuard ], children: [
    { path: '', component: PagesIndexComponent },
     { path: 'tag/:slug', component: PagesIndexComponent },
     { path: 'item/:slug', component: PagesComponent }
  ]}, 

  { path: 'logs', children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    // abstraction slug
    { path: '_item', children: [
      { path: '', redirectTo: '/logs/all', pathMatch: 'full' },
      { path: ':slug', component: DesignLoggerComponent },
    ]},
    { path: ':slug', component: DesignLoggerComponent },
  
  ]},
  
  { path: 'reviews',  component: ReviewsComponent, canActivate: [ AuthGuard ] },

  { path: 'login', component: LoginComponent },
  { path: '**',    component: NoContentComponent },
];
