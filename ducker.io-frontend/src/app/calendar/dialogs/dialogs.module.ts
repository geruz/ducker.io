import { DialogsService } from './dialogs.service';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { ConfirmDialog, NullDefaultValueDirective }   from './dialogs.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
    ],
    exports: [
        ConfirmDialog,
    ],
    declarations: [
        ConfirmDialog,
        NullDefaultValueDirective
    ],
    providers: [
        DialogsService,
    ],
    entryComponents: [
        ConfirmDialog,
    ],
})
export class DialogsModule { }
