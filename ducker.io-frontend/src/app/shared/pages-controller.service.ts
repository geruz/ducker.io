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
export class PagesControllerService {

  public _api = 'http://192.168.0.147:4200';

  constructor(private http: Http) {
    
  }
  
  public getPagesAll() {
    return this.http.get(this._api + '/pages/item-list').map((res)=>res.json());
  }

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

  public updatePagesTag(id, tags) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let params = {
      target_id: id,
      tags_id: tags,
    }
    
    console.debug('CONTENT PARAMS: ' + JSON.stringify(params));

    return this.http.post(this._api + '/pages/item/updateTags', params, {headers: headers}).map((res)=>res.json());    

  }

  public getPageTagItems(slug: string) {
    return this.http.get(this._api + '/pages/tag/' + slug).map((res)=>res.json());
  }

  public removePagesItem(slug) {
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let params = {
      action: true,
    }

    return this.http.post(this._api + '/pages/item/' + slug + '/remove', params, {headers: headers}).map((res)=>res.json());    
   
  }

  public createPagesItem(title: string, slug: string) {
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let params = {
      title: title,
      toSlug: slug
    }

    return this.http.post(this._api + '/pages/new', params, {headers: headers}).map((res)=>res.json());    
   
  }     

  public getPagesViewGridSettings() {
    return this.http.get(this._api + '/settings/pages/viewgrid').map((res)=>res.json());
  } 

}
