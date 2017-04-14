import { Observable } from 'rxjs/Rx';
import { ConfirmDialog } from './dialogs.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: any, tags: any, docTags: any): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmDialog>;

        dialogRef = this.dialog.open(ConfirmDialog);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.GlobalTags = tags;
        dialogRef.componentInstance.DocumentTags = docTags;

        return dialogRef.afterClosed();
    }
}
