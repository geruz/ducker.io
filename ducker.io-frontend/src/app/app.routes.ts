import { Routes } from '@angular/router';
import { HomeComponent } from './home';

import { ReviewsComponent } from './reviews/reviews.component';

import { PagesIndexComponent } from './pages/pages-index/pages-index.component';
import { PagesComponent } from './pages/pages.component';
import { NoContentComponent } from './no-content';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guards';

import { DataResolver } from './app.resolver';

import { LoggerComponent } from './logger/logger.component';

export const ROUTES: Routes = [
   { path: '',  component: ReviewsComponent, canActivate: [ AuthGuard ]  },

  { path: 'home',  component: HomeComponent, canActivate: [ AuthGuard ] },

  { path: 'pages', canActivate: [ AuthGuard ], children: [
    { path: '', component: PagesIndexComponent },
     { path: 'tag/:slug', component: PagesIndexComponent },
     { path: 'item/:slug', component: PagesComponent }
  ]}, 
  
  { path: 'reviews',  component: ReviewsComponent, canActivate: [ AuthGuard ] },

  { path: 'logger', children: [
    { path: '', component: LoggerComponent },
     { path: ':slug', component: LoggerComponent },
     { path: 'item/:slug', component: LoggerComponent }
  ]}, 

  { path: 'login', component: LoginComponent },
  { path: '**',    component: NoContentComponent },
];
