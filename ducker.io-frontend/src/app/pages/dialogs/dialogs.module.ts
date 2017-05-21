import { PagesDialogsService } from './dialogs.service';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { PagesConfirmDialog }   from './dialogs.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
    ],
    exports: [
        PagesConfirmDialog,
    ],
    declarations: [
        PagesConfirmDialog
    ],
    providers: [
        PagesDialogsService,
    ],
    entryComponents: [
        PagesConfirmDialog,
    ],
})
export class PagesDialogsModule { }
