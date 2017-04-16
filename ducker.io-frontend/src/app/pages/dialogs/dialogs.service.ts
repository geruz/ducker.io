import { Observable } from 'rxjs/Rx';
import { PagesConfirmDialog } from './dialogs.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class PagesDialogsService {

    public getTitle: string;
    public getSlug: string;

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, slug: string): Observable<any> {

        let dialogRef: MdDialogRef<PagesConfirmDialog>;

        dialogRef = this.dialog.open(PagesConfirmDialog);

        dialogRef.componentInstance.createTitle = title;
        dialogRef.componentInstance.createSlug = slug;

        return dialogRef.afterClosed();
    }

    
}
