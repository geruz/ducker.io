import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './links.routes';

import { LinksComponent } from './links.component';
import { SubheaderComponent } from './subheader/subheader.component';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    LinksComponent,
    SubheaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [ SubheaderComponent ]
})
export class LinksModule {
  public static routes = routes;
}
