import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { PagesControllerService } from '../../shared/pages-controller.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import 'rxjs/add/operator/startWith';


@Component({
    selector: 'pages-confirm-dialog',
    templateUrl: 'dialogs.component.html',
    providers: [ PagesControllerService ]
})
export class PagesConfirmDialog implements OnInit {  

    public createTitle: string;
    public createSlug: string;

    constructor(
        public dialogRef: MdDialogRef<PagesConfirmDialog>, 
        public PagesClass: PagesControllerService,
        public _router: Router) {

        }


    public ngOnInit() {


    } 

    public onSubmit() {   


    this.PagesClass.createPagesItem(this.createTitle, this.createSlug).subscribe(
      (data: string) => {
          console.log('DATA> ' + data);
    });

    let rut = this._router;
    let toSlug = this.createSlug;

    console.log('LLOLO: ' +  this.createSlug);

    setTimeout(function() {
      rut.navigate(['/pages/item/', toSlug]);
    }, 400);    

    }

}