import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoggerService {


  constructor (private http: Http) {}

  public _api = 'http://localhost:4200';

  public getLoggerData() {
      return this.http.get(this._api + '/logger').map((res)=>res.json());
  }

  public getLoggerById(slug: string) {
      return this.http.get(this._api + '/logger/' + slug).map((res)=>res.json());
  }  

  public getLoggerByAbstraction(abstraction: string) {
    return this.http.get(this._api + '/logger/abstraction/' + abstraction).map((res)=>res.json());
  }
  
/*

  public getPagesAll() {
    return this.http.get(this._api + '/pages/item-list').map((res)=>res.json());
  }

  public updatePagesItem(id, content, slug) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let params = {
      target_id: id,
      content: content,
    }

    console.debug('CONTENT SLUG: ' + slug);

    return this.http.post(this._api + '/pages/item/' + slug + '/update', params, {headers: headers}).map((res)=>res.json());    

  }
*/

}
