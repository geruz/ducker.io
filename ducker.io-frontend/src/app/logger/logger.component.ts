import {
  Component,
  AfterViewInit,
  OnInit,
} from '@angular/core';

import { AppState } from '../app.service';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { GetReviewsService } from './services/getReviews.service';

@Component({
  selector: 'logger',
  templateUrl: './logger.component.html',
})

export class LoggerComponent implements OnInit, AfterViewInit {

  public showLoading = false;

  public PageTitle = 'LOGGER';
  public PageSubTitle = 'Новая страница лота, объявления и тендера';

  public LoggerContainer = [
    { 
      'date': '23.01.88',
      'title': 'Привет',
      'content': 'Привет, я такой-=то такой0-то'
    },
    { 
      'date': '23.01.88',
      'title': 'Привет',
      'content': 'Привет, я такой-=то такой0-то'
    },
    { 
      'date': '23.01.88',
      'title': 'Привет',
      'content': 'Привет, я такой-=то такой0-то'
    },
    { 
      'date': '23.01.88',
      'title': 'Привет',
      'content': 'Привет, я такой-=то такой0-то'
    },
    { 
      'date': '23.01.88',
      'title': 'Привет',
      'content': 'Привет, я такой-=то такой0-то'
    },
    { 
      'date': '23.01.88',
      'title': 'Привет',
      'content': 'Привет, я такой-=то такой0-то'
    },
    { 
      'date': '23.01.88',
      'title': 'Привет',
      'content': 'Привет, я такой-=то такой0-то'
    },
    
  ]

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////
    A N G U L A R   P A R T
  */

  constructor(
    private router: Router,
    private _routeActive: ActivatedRoute,
    // private _reviews: GetReviewsService
  ) {

  }

  public ngOnInit() {
    // INIT
    
  }

  public ngAfterViewInit() {
    // INIT VIEW
  }

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////
    C U S T O M
  */





} // END OF ALL
