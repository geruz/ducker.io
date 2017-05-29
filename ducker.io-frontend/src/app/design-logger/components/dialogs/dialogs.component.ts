import { MdDialogRef } from '@angular/material';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DesignLoggerControllerService } from '../../services/design-logger.service';

import 'rxjs/add/operator/startWith';


@Component({
    selector: 'logger-dialog',
    templateUrl: 'dialogs.component.html',
    styleUrls: ['dialogs.component.scss']
})
export class LoggerConfirmDialog implements OnInit, AfterViewInit {  

    public userAdmin = false;

    public itemID: string;

    public viewEditorDisplay = false;

    public ItemDataStorage = {
        'id': 1,
        'date_start': '1495722715000',
        'date_end': '1495722715000',
        'title': 'Нулевая запись',
        'abstraction_slug': [
            { 
                'slug':'default',
                'title':'Общее'
            }],
        'status': 'success', 
        'content': '<b>Добрый вечер</b>'
    }

    constructor(
        public dialogRef: MdDialogRef<LoggerConfirmDialog>, 
        private _router: Router,
        private _ActivatedRoute: ActivatedRoute,
        private _location: Location,
        public _logger: DesignLoggerControllerService) {
            
        }


    public ngOnInit() {
            let _address = '/logs/_item/'+this.itemID;
            this._location.replaceState(_address);
            let t = localStorage.getItem('backToURL');

            if(_address == t) {
                localStorage.setItem('backToURL','/logs/all');
            }

    } 

    public ngAfterViewInit() {
        this._logger.getLogItemById(this.itemID).subscribe(
            (result) => {
                    this.ItemDataStorage = result[0];

                    let userDataStorage = localStorage.getItem('currentUser');
                    if(userDataStorage) {
                        userDataStorage = JSON.parse(userDataStorage);
                            if(userDataStorage['role'] == 3) this.userAdmin = true;
                            else this.userAdmin = false;
                    }

            });
    }

    public goToAbstraction(_abstractURL: string) {
        localStorage.setItem('backToURL','/logs/'+ _abstractURL);
        this._router.navigateByUrl('/logs/'+ _abstractURL);
        this.dialogRef.close();
    }

    public onSubmit() {   
        console.debug('On SUBMIT');
    }

    public viewEditor() {
        if(this.viewEditorDisplay) {
            this.viewEditorDisplay = false;
        } else {
            this.viewEditorDisplay = true;
        }
    }

}