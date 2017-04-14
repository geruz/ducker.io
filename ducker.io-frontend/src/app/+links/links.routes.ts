import { LinksComponent } from './links.component';

export const routes = [
  { path: '', children: [
    { path: '', component: LinksComponent },
  ]},
];
