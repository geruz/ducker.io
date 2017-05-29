import { Observable } from 'rxjs/Rx';
import { LoggerConfirmDialog } from './dialogs.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoggerDialogsService {

    public getTitle: string;
    public getSlug: string;

    private _api = 'localhost:4200/logger/';

    constructor(private dialog: MdDialog, private _http: Http) { }

    public confirm(itemID: string): Observable<any> {

        let dialogRef: MdDialogRef<LoggerConfirmDialog>;

        dialogRef = this.dialog.open(LoggerConfirmDialog);

        dialogRef.componentInstance.itemID = itemID;

        return dialogRef.afterClosed();
    }


    
}
