import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * @description
 * @class
 */
@Injectable()
export class AuthService {

  public _api = 'http://192.168.1.39:4200';

  constructor(private http: Http) {
    
  }
  
  public postTest(_username, _password) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let params = {
      action: true,
      pass: _password,
    }

    return this.http.post(this._api + '/auth/login/' + _username, params, {headers: headers}).map((res)=>res.json());    

  }

/*
  public getPagesItem(slug: string) {
    return this.http.get(this._api + '/pages/item/' + slug).map((res)=>res.json());
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
