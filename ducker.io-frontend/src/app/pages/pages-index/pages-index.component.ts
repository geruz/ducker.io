import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppState } from '../../app.service';
import { PagesControllerService } from '../../shared/pages-controller.service';
import { MdSnackBar } from '@angular/material';

import { PagesDialogsService } from '../dialogs/dialogs.service';

import { OrderByPipe } from '../../parts/orderBy.pipes';

@Component({
  selector: "pages-index",
  templateUrl: "./pages-index.component.html",
  providers: [ OrderByPipe ],
})

export class PagesIndexComponent implements OnInit {

  public DocumentTitle = 'Страницы';
  public DocumentRendered: any;
  public DocumentTags: any;
  public TagsList: any;

  public createTitle: string;
  public createSlug: string;

  public PagesGridView = 'one';
  public PagesSorting = '-date_created';
  
  constructor(
    public appState: AppState, 
    public PagesClass: PagesControllerService,
    public snackBar: MdSnackBar,
    public route: ActivatedRoute,
    public _router: Router,    
    public pagesDialog: PagesDialogsService
  ) { 

  }

  public ngOnInit() {

    this.PagesClass.getPagesViewGridSettings().subscribe(
      (data) => {
        this.PagesGridView = data;
        console.log('PagesGridView: ' + data);
    });

    this.appState.getCalendarTagList().subscribe(
      (data) => {
        this.TagsList = data;
    });

    this.PagesClass.getPagesAll().subscribe(
      (data) => {
        this.DocumentRendered = data;
    });

    this.route.params.forEach((params:Params) => {

      let slug = params['slug'];
      if(slug) {

      this.PagesClass.getPageTagItems(slug).subscribe(
        (data) => {
            this.DocumentRendered = data;
      });

      } else {
          this.PagesClass.getPagesAll().subscribe(
            (data) => {
              this.DocumentRendered = data;
          });    
      }

    });    

  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }  

  public setPageGridView(numb: string) { 
    this.PagesGridView = numb;
  }

  public updateDocumentRender() {
    
    this.PagesClass.getPagesAll().subscribe(
      (data) => {
        console.debug('W: ' + data);
      });
  }

  public openDialog() {
    this.pagesDialog
      .confirm(this.createTitle, this.createSlug)
      .subscribe(res => {


        this.updateDocumentRender();
        this.openSnackBar('Документ создан', 'ОК');
      });
  }

public setPageSorting(value: string) {
  this.PagesSorting = value;
}


}
