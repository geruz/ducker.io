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
  styleUrls: ['./logger.component.scss']
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

  public RightContainer: any;

  public currentAbstraction: string;


  /* ////////////////////////////////////////////////////////////////////////////////////////////////////
    A N G U L A R   P A R T
  */

  constructor(
    private _router: Router,
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

      let _slug = params['slug'];
      let _router_url = this._router.url;

      let reg = /_abstraction/g;
      let _insideDetect = reg.test(_router_url);

      if(_slug) {

        if(_insideDetect) {
          // console.log('inside abstraction: ' + _slug);
          this._displayAbstractionBar = true;
          this.getByAbstraction(_slug);
        } else {
          // console.log('! inside logger' + _slug);
          this._displayAbstractionBar = false;
          this._LOGGER.getLoggerById(_slug).subscribe((res) => {
            this.RightContainer = res[0];
            //console.log(JSON.stringify(this.RightContainer));
          })
        }

        if(_insideDetect && _slug == '_abstraction') {
          console.log('COLLISION DETECTED! ROUTING');
          this._router.navigateByUrl('/logger');
        }

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
