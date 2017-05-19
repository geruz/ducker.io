import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';

import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/startWith';


@Component({
    selector: 'confirm-dialog',
    templateUrl: 'dialogs.component.html',
    providers: [ AppState ]
})
export class ConfirmDialog implements OnInit {  

    public title: string;
    public message: string;
    public GlobalTags: any;
    public DocumentTags: any;
    public DocumentTitle: string;

    public stateCtrl: FormControl;
    public filteredStates: any;

    public states = ['Петр', 'Дима'];

    public tagsForm: any;

    public test = '';

    public sizeOfArray: any;



    constructor(
        public dialogRef: MdDialogRef<ConfirmDialog>, 
        public appState: AppState) {

            this.stateCtrl = new FormControl();
            /*
            let _DocumentTags = this.DocumentTags;

            this.appState.getCalendarTagList().subscribe(
                (data) => {
                    this.GlobalTags = data;
                    
                    let temp = this.states;
                    this.GlobalTags.forEach(function(element, index) {
                        console.log('DP: ' + JSON.stringify(_DocumentTags));

                    });

                    this.states = temp;


                    // console.debug('DOC TAGS DIALOG: ' + this.DocumentTags);
            });    
            */  
        }

    public filterStates(val: string) {
    return val ? this.states.filter(s => new RegExp(`^${val}`, 'gi').test(s))
                : this.states;
    }    

    public ngOnInit() {
        
        let temp = [];

        let _DocumentTags = this.DocumentTags;

        this.GlobalTags.forEach(function(element, index) {
            if(_DocumentTags[0]) {
            _DocumentTags.forEach(function(elem, ind) {
                if(elem['title'] !== element['title']) temp.push(element['title']);
                else console.log('!!! NOT'); 
            });
            } else temp.push(element['title']); 
        });

        console.log('AFTER PUSHED: ' + JSON.stringify(temp));

        this.states = temp;
     

        this.filteredStates = this.stateCtrl.valueChanges
            .startWith(null)
            .map((name) => this.filterStates(name)); 
    } 

    public onSubmit(state) {   
        if(this.DocumentTags) console.debug('TRUE');

        let _slug = this.getTagSlugByTitle(state);
        console.log('_slug: ' + _slug);



    }

public deleteMsg(msg) {
    console.log('msg: ' + msg);
    console.log('dT: ' + JSON.stringify(this.DocumentTags));
    let index = this.DocumentTags.indexOf(msg);
    console.log('INDE: ' + index);
    if (index !== -1) {
        this.DocumentTags.splice(index, 1);
    }        
}

    public onClear() {
        this.test = '';
    }

    public getTagSlugByTitle(title: string) {
        console.log('title: ' + title + ' / globalTags: ' + this.GlobalTags);
        let exit = [];
        this.GlobalTags.forEach(function(element, index) {
            if(title == element['title']) exit = element['slug'];
        });
        return exit;
        //console.log('EXIT: ' + exit);
    }

}


import {NgControl} from "@angular/forms";
import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
  selector: 'input[nullValue]'
})
export class NullDefaultValueDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event.target'])
  onEvent(target: HTMLInputElement){
    this.control.viewToModelUpdate((target.value === '') ? null : target.value);
  }
}