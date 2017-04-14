import { NgModule, ModuleWithProviders } from '@angular/core';
import { HeadSubheaderComponent } from '../parts/head-subheader/head-subheader.component';
import { EditorDirective } from '../parts/tinymce.directive';
// import '../../../node_modules/tinymce/tinymce.js';

const MODULES = [

];

const PIPES = [
  // put pipes here
];

const COMPONENTS = [
  // put shared components here
    HeadSubheaderComponent,
    EditorDirective
];

const PROVIDERS = [

];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...MODULES,
    ...PIPES,
    ...COMPONENTS
  ]
})
export class SharedModule {
}
