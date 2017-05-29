import { Component, OnInit } from '@angular/core';
import { LoggerDialogsService } from './components/dialogs/dialogs.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DesignLoggerControllerService } from './services/design-logger.service';

@Component({
    selector: 'design-logger',
    templateUrl: 'design-logger.component.html',
    styleUrls: ['design-logger.component.scss']
})
export class DesignLoggerComponent  implements OnInit {

  public showLoading = false;

  public PageTitle = 'События';
  public PageSubTitle = 'Утверждение решений';

  public _LogsItemStorage: any;

  public _AbstractionsList = [{"id":0,"slug":"all","parent_slug":"all","title":"Все записи"}];

  public currentAbstraction = 'Всё подряд';
  public sllug: string;

  // public slug: string;

  constructor(
    public loggerDialog: LoggerDialogsService,
    public _loggerService: DesignLoggerControllerService,
    public _router: Router,
    public _activeRouter: ActivatedRoute,
    private _location: Location,
  ) { 

  }

  public ngOnInit() {

        this._loggerService.getLogsList().subscribe(
        (result) => {
            this._LogsItemStorage = result;

            this._loggerService.getAbstractions().subscribe(
              (result) => {
                // console.log('RESUL::::::T ' + JSON.stringify(result));
                this._AbstractionsList = result;
              });            
              
            console.log('logs result: ' + this._LogsItemStorage);
        })        

    this._activeRouter.params.forEach((params:Params) => {



        let _slug = params['slug'];
        this.sllug = _slug;

        let fullURL = this._router.url;

        let __isItemReg = /_item/g;
        let __isItem = __isItemReg.test(fullURL);
        console.debug('IS ITEM: ' + __isItem);

        this._loggerService.getAbstractions().subscribe(
          (result) => {
            // console.log('RESUL::::::T ' + JSON.stringify(result));
            this._AbstractionsList = result;
            let exet;
            this._AbstractionsList.forEach(function(element) {
              if(_slug == element['slug']) exet = element['title'];
              // else exet = 'Всё подряд'
            })
            this.currentAbstraction = exet;
          });

        if(__isItem) {

        let _cac = localStorage.getItem('backToURL');
            console.log('loca 1111 cache: ', _cac);
            this.currentAbstraction = 'Всё подряд';
            this.openDialog(_slug);
            
        } else {

          if(_slug == 'all') {
            this._loggerService.getLogsList().subscribe(
              (result) => {
                  this._LogsItemStorage = result;
                  this.currentAbstraction = 'Всё подряд';
                  console.log('logs result: ' + this._LogsItemStorage);
              })
          } else {
            // Сортировка данных по абстракциям (показать конкретную)
            this._loggerService.getLogItemsByAbstraction(_slug).subscribe(
              (result) => { 
                this._LogsItemStorage = result;
                // this.currentAbstraction = _slug;
              })
          }


        }

    });
  }


  public test() {
    console.log('router url: ' + this._router.url);
  }
  
  public openDialog(id: string) {
    let tt = this.currentAbstraction;
    
    localStorage.setItem('backToURL', this._router.url);
    this.loggerDialog
      .confirm(id)
      .subscribe(res => {
          let _local = localStorage.getItem('backToURL');
          this._location.replaceState(_local);
          // if(tt == 'Всё подряд') this.currentAbstraction = 'Всё подряд';
      });
  }

}
