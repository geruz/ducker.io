import {
  Component,
  AfterViewInit,
  OnInit,
} from '@angular/core';

import { AppState } from '../app.service';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { LoggerService } from './services/logger-storage.service';

@Component({
  selector: 'logger',
  templateUrl: './logger.component.html',
})

export class LoggerComponent implements OnInit, AfterViewInit {

  public showLoading = false;

  public PageTitle = 'Утверждение решений';
  public PageSubTitle = 'Глобальные стили. Дизайн, функционал страниц и т.д.';

  public _displayAbstractionBar = false;

  public LoggerContainer = [
    { 
      'date_start': '1495639921988',
      'date_end': '1495639921988',
      'title': 'Привет',
      'abstraction_slug': [],
      'status': 'waiting',
      'content': 'Привет, я такой-=то такой0-то',
    }    
  ];

  public currentAbstraction: string;


  /* ////////////////////////////////////////////////////////////////////////////////////////////////////
    A N G U L A R   P A R T
  */

  constructor(
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _LOGGER: LoggerService
  ) {

  }

  public ngOnInit() {
    // INIT
    this.getLoggerItems();
  }

  public ngAfterViewInit() {
    this._ActivatedRoute.params.subscribe(params => {
        if(params['slug']) {

          this.getByAbstraction(params['slug']);
          this._displayAbstractionBar = true;         

        } else {
          this._displayAbstractionBar = false;
        }
    });
  }

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////
    C U S T O M
  */

  public getByAbstraction(abstraction: string) {
    this._LOGGER.getLoggerByAbstraction(abstraction).subscribe(
      (result) => {
          this.LoggerContainer = result;
          this.currentAbstraction = result[0]['abstraction_slug'][0]['title'];
      })
  }

  private getLoggerItems() {
    this._LOGGER.getLoggerData().subscribe(
      (result) => {
          this.LoggerContainer = result;
      });
  }

  



} // END OF ALL
