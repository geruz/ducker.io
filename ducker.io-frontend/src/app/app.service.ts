import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  public _api = 'http://192.168.1.39:4200';
  // public _api = 'http://192.168.0.147:4200';

  public tester = 'none';

  public _state: InternalStateType = { };

  public dataBase: any;

  public constructor(@Inject(DOCUMENT) private _document: any, private http: Http) {
  }

  public setTitle(title: string) {
    return this._document.title = title + ' • Ducker';
  }  

  // >>>>> C A L E N D A R

  public getCalendarAll() {
    return this.http.get(this._api + '/calendar/item-list').map((res)=>res.json());
  }

  public getCalendarItem(slug: string) {
    return this.http.get(this._api + '/calendar/item/' + slug).map((res)=>res.json());
  }

  public getCalendarTagList() {
    return this.http.get(this._api + '/calendar/tag-list').map((res)=>res.json());
  }

  public getCalendarTagItems(slug: string) {
    return this.http.get(this._api + '/calendar/tag/'+slug).map((res)=>res.json());
  }  

  public updateCalendarItem(id, content, slug) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let params = {
      target_id: id,
      content: content,
    }

    console.debug('CONTENT SLUG: ' + slug);

    return this.http.post(this._api + '/calendar/item/' + slug + '/update', params, {headers: headers}).map((res)=>res.json());    

  }

  public updateCalendarTag(id, tags) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let params = {
      target_id: id,
      tags_id: tags,
    }
    

    console.debug('CONTENT PARAMS: ' + JSON.stringify(params));

    return this.http.post(this._api + '/calendar/item/updateTags', params, {headers: headers}).map((res)=>res.json());    

  }

  public createCalendarItem() {
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let params = {
      target_id: '1',
      content: '1'
    }

    return this.http.post(this._api + '/calendar/new', params, {headers: headers}).map((res)=>res.json());    
   
  }

  public removeCalendarItem(slug) {
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let params = {
      action: true,
    }

    return this.http.post(this._api + '/calendar/item/' + slug + '/remove', params, {headers: headers}).map((res)=>res.json());    
   
  }

  // >>>>>> P A G E S 




}