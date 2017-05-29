import { LoggerDialogsService } from './dialogs.service';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { LoggerConfirmDialog }   from './dialogs.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ROUTES } from '../../../app.routes';

import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

@NgModule({
    imports: [
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    ],
    exports: [
        LoggerConfirmDialog,
    ],
    declarations: [
        LoggerConfirmDialog
    ],
    providers: [
        LoggerDialogsService,
    ],
    entryComponents: [
        LoggerConfirmDialog,
    ],
})
export class LoggerDialogsModule { }
