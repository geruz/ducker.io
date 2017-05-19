import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppState } from '../app.service';
import { EditorDirective } from '../parts/tinymce.directive';
import { MdSnackBar } from '@angular/material';

import { DialogsService } from './dialogs/dialogs.service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  providers: [ EditorDirective ]
})
export class CalendarComponent implements OnInit, AfterViewInit {

  public DocumentTitle: string;
  public DocumentContent: any;
  public DocumentTags: any;
  public GlobalTags: any;

  public slug: string;
  public DocumentId: any;

  constructor(
    public appState: AppState, 
    public route: ActivatedRoute,
    public _router: Router,
    public snackBar: MdSnackBar,
    public _editta: EditorDirective,
    private dialogsService: DialogsService
    ) { }

  public ngOnInit() {

    this.appState.getCalendarTagList().subscribe(
      (data) => {
        this.GlobalTags = data;
      }
    )

     this.route.params.forEach((params:Params) => {

      this.slug = params['slug'];

      this.appState.getCalendarItem(this.slug).subscribe(
        (data) => {
          // console.debug('DOCUMENT: ' + JSON.stringify(data));
          this.DocumentTitle = data[0]['title'];
          this.DocumentContent = data[0]['content'];
          this.DocumentTags = data[0]['tags_id'];
          this.DocumentId = data[0]['id'];
          this.setTinyContent(data[0]['content']);
      });

      // console.debug('CONTENT: ' + + JSON.stringify(this.DocumentContent));

     });

  }


  public ngAfterViewInit() {

  }  

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }  

  public getTinyContent() {
    this.DocumentContent = this._editta.getContent();
    return false;
  }

  public setTinyContent(data) {
    let exit;
    if(data) exit = this._editta.setContent(data);
    else { console.log('DATA IS UNDEFINED'); }
    return exit;

  }

  public updateCalendarItem() {

    this.getTinyContent();

    this.appState.updateCalendarItem(this.DocumentId, this.DocumentContent, this.slug).subscribe(
      (data) => {
        this.openSnackBar(data,'ОК');

    });

  }

  public updateCalendarTag() {

    this.getTinyContent();

    this.appState.updateCalendarTag(this.DocumentId, this.DocumentTags).subscribe(
      (data) => {
        this.openSnackBar(data,'ОК');
    });

  }

  public openDialog() {
    this.dialogsService
      .confirm('Редактировать метки', 'Are you sure you want to do this?', this.GlobalTags, this.DocumentTags, this.DocumentTitle)
      .subscribe(res => console.log('R R R ESU: ' + res));
  }

  public removeCalendarItem() {
    let slug = this.slug;
    this.appState.removeCalendarItem(slug).subscribe(
      (data) => {
        this.openSnackBar(data, 'OK');
    });
        let rut = this._router;
        
        setTimeout(function() {
          
          rut.navigate(['calendar']);
        }, 400);

  }

  public setDocumentTag(_slug, _title) {
    console.log('_slug: ' + _slug);
    console.log('_title: ' + _title);
    this.DocumentTags = [{
      slug: _slug,
      title: _title
    }]

    this.appState.updateCalendarTag(this.DocumentId, this.DocumentTags).subscribe(
      (data) => {
        console.log('>>> DOCUMENT TAGS: ' + JSON.stringify(this.DocumentTags));
        console.debug('SUBSCRIBE: >>> ' + data);
    });

  }


}

