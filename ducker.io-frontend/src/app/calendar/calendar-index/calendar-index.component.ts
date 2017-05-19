import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppState } from '../../app.service';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'calendar-index',
  templateUrl: './calendar-index.component.html',
})
export class CalendarIndexComponent implements OnInit {
  
  public DocumentTitle = 'Календарь';
  public DocumentRendered: any;
  public TagsList: any;

  constructor(
    public appState: AppState, 
    public snackBar: MdSnackBar,
    public route: ActivatedRoute,
    public _router: Router,
    ) { }

  public ngOnInit() {

    this.appState.getCalendarAll().subscribe(
      (data) => {
        this.DocumentRendered = data;
      });

    this.appState.getCalendarTagList().subscribe(
      (data) => {
        this.TagsList = data;
    });

     this.route.params.forEach((params:Params) => {

      let slug = params['slug'];
      if(slug) {

      this.appState.getCalendarTagItems(slug).subscribe(
        (data) => {
            this.DocumentRendered = data;
      });

      } else {
        this.appState.getCalendarAll().subscribe(
          (data) => {
            this.DocumentRendered = data;
        });        
      }

     });    

  }

  public ngAfterViewInit() {
  }  



  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }  

  public createNew() {

    let slug_created: string;

    this.appState.createCalendarItem().subscribe(
      (data: string) => {
        this.updateDocumentRender();
        slug_created = data;
        console.log('Subscribe by CREATE NEW () ' + slug_created);   
        this.openSnackBar('Запись создана', 'ОК');
    });

    let rut = this._router;

    setTimeout(function() {
      rut.navigate(['/calendar/item/', slug_created]);
    }, 400);    


  }

  public updateDocumentRender() {
    
    this.appState.getCalendarAll().subscribe(
      (data) => {
        console.debug('W: ' + data);
      });
  }


}