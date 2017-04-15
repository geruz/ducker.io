import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppState } from '../../app.service';
import { PagesControllerService } from '../../shared/pages-controller.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: "pages-index",
  templateUrl: "./pages-index.component.html",
})

export class PagesIndexComponent implements OnInit {

  public DocumentTitle = 'Страницы';
  public DocumentRendered: any;
  public TagsList: any;
  
  constructor(
    public appState: AppState, 
    public PagesClass: PagesControllerService,
    public snackBar: MdSnackBar,
    public route: ActivatedRoute,
    public _router: Router,    
  ) { 

  }

  public ngOnInit() {

    this.appState.getCalendarTagList().subscribe(
      (data) => {
        this.TagsList = data;
    });

    this.PagesClass.getPagesAll().subscribe(
      (data) => {
        this.DocumentRendered = data;
    });

  }




  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }  






}
