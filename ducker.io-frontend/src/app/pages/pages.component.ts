import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppState } from '../app.service';
import { PagesControllerService } from '../shared/pages-controller.service';
import { EditorDirective } from '../parts/tinymce.directive';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/filter';

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"],
  providers: [ EditorDirective ]  
})

export class PagesComponent implements OnInit {

  public DocumentTitle: any;
  public DocumentContent: any;
  public DocumentTags: any;
  public GlobalTags: any;

  public slug: string;
  public DocumentId: any;

  constructor(
    public appState: AppState, 
    public PagesClass: PagesControllerService,
    public route: ActivatedRoute,
    public _router: Router,
    public snackBar: MdSnackBar,
    public _editta: EditorDirective,  
  ) { 

  }

  public ngOnInit() {

    this.appState.getCalendarTagList().subscribe(
      (data) => {
        this.GlobalTags = data;
      }
    );

    this.route.params.forEach((params:Params) => {

    this.slug = params['slug'];

    this.PagesClass.getPagesItem(this.slug).subscribe(
      (data) => {
        // console.debug('DOCUMENT: ' + JSON.stringify(data));
          this.DocumentTitle = data[0]['title'];
          this.DocumentContent = data[0]['content'];
          // this.DocumentTags = data[0]['tags_id'];
          this.DocumentId = data[0]['id'];
          this.setTinyContent(data[0]['content']);
    });

    // console.debug('CONTENT: ' + + JSON.stringify(this.DocumentContent));

    });


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

  public setDocumentTag(_slug, _title) {
    console.log('_slug: ' + _slug);
    console.log('_title: ' + _title);
    this.DocumentTags = [{
      slug: _slug,
      title: _title
    }]

    this.PagesClass.updatePagesTag(this.DocumentId, this.DocumentTags).subscribe(
      (data) => {
        console.log('>>> DOCUMENT TAGS: ' + JSON.stringify(this.DocumentTags));
        console.debug('SUBSCRIBE: >>> ' + data);
    });

  }

  public updatePagesItem() {

    this.PagesClass.updatePagesItem(this.DocumentId, this.DocumentContent, this.slug).subscribe(
      (data) => {
        this.openSnackBar(data,'ОК');
    });

  }

  public updatePagesTag() {

    this.PagesClass.updatePagesTag(this.DocumentId, this.DocumentTags).subscribe(
      (data) => {
        this.openSnackBar(data,'ОК');
    });

  }



}
