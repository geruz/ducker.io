import {
  Component,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { LoggerService } from '../services/logger-storage.service';
import { PlatformLocation } from '@angular/common';

@Component({
    selector: 'logger-inside',
    templateUrl: 'logger-inside.component.html',
})
export class LoggerInsideComponent implements OnInit {

  public showLoading = false;

  public PageTitle = 'Утверждение решений';
  public PageSubTitle = 'Глобальные стили. Дизайн, функционал страниц и т.д.';

  public displayContent = '0';

  public RightContainer: any;
  
  constructor(
    private _router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _LOGGER: LoggerService,
    private location: PlatformLocation
  ) {
    location.onPopState(() => {

        this.displayContent = '1';

    });
  }

  public ngOnInit() {
    this._ActivatedRoute.params.subscribe(params => {
            this.showLoading = true;
            let _slug = params['slug'];
            let _router_url = this._router.url;
            console.log('_router_url: ' + _router_url + ' / -slug: ' + _slug);    
 
            let onlyNumbers = /\/[0-9]/g
            let _isItAnItem = onlyNumbers.test(_router_url);
            if(_isItAnItem) {
                this._LOGGER.getLoggerById(_slug).subscribe(
                    (result) => {
                            this.showLoading = false;
                            this.displayContent = '1';
                            this.RightContainer = result[0];
                    });
            }
            

        });
    }

}
