import {
  Component,
  AfterViewInit,
  OnInit, HostListener, AfterViewChecked, ViewChild
} from '@angular/core';



import { AppState } from '../app.service';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { LoggerService } from './services/logger-storage.service';

import { ScrollDir } from './services/scroll-watcher.directive';

import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})

export class LoggerComponent implements OnInit, AfterViewInit, AfterViewChecked  {

  @ViewChild(ScrollDir) scroll: ScrollDir;

  public showLoading = false;

  public PageTitle = 'Утверждение решений';
  public PageSubTitle = 'Глобальные стили. Дизайн, функционал страниц и т.д.';
  public _MiddleUrl = '';

  public displayContent = '0';

  public isChild = false;

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

  public goBackToAbstraction = '';




  /* ////////////////////////////////////////////////////////////////////////////////////////////////////
    A N G U L A R   P A R T
  */

  constructor(
    private _router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _LOGGER: LoggerService,
    private location: PlatformLocation,

  ) {
    location.onPopState(() => {

        this.displayContent = '1';

    });
  }

  public ngOnInit() {
    // INIT
     this.getLoggerItems();
  }

  public ngAfterViewInit() {
    
    this._ActivatedRoute.params.subscribe(params => {

      let _slug = params['slug'];
      let _router_url = this._router.url;
      console.log('_router_url: ' + _router_url + ' / -slug: ' + _slug);

      let onlyNumbers = /\/[0-9]/g
      let _isItAnItem = onlyNumbers.test(_router_url);
      console.log('isItAnItem: ' + _isItAnItem);

      if(_isItAnItem) {
          this.isChild = true;
          this._displayAbstractionBar = false;
          this._LOGGER.getLoggerById(_slug).subscribe(
            (loggerData) => {

                this.RightContainer = loggerData[0];

            });
      } else {
        this.isChild = false;
        if(_slug == 'all') { 
          this._displayAbstractionBar = false;
          this.RightContainer = '';
          this.getLoggerItems();
        } else {
          this._displayAbstractionBar = true;
          this.RightContainer = '';
          this.getByAbstraction(_slug);
        }
      }

    });
  }

  ngAfterViewChecked() {

  }

  public afterAA(lo) {
        lo = String(lo);
     
          localStorage.setItem('scrollY_Position', lo);
  }

  public showModal(id) {
      this._LOGGER.getLoggerById(id).subscribe(
        (result) => {
            this.RightContainer = result[0];
        })
  }

  public closeModal() {
      this.RightContainer = '';
  }

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////
    C U S T O M
  */

  public getByAbstraction(abstraction: string) {
    this._LOGGER.getLoggerByAbstraction(abstraction).subscribe(
      (result) => {
          this.LoggerContainer = result;
          this.currentAbstraction = result[0]['abstraction_slug'][0]['title'];
          this.displayContent = '1';
      })
  }


  private getLoggerItems() {
    this._LOGGER.getLoggerData().subscribe(
      (result) => {
          this.LoggerContainer = result;
          // console.log('result:  ' + result);
          this.displayContent = '1';
      });
  }


  



} // END OF ALL
