import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DesignLoggerControllerService {

    private _api = 'http://localhost:4200/logger';

    constructor( private _http: Http ) {

    }

    public getLogItemById(id: string) {
        return this._http.get(this._api + '/' + id).map((res)=>res.json());
    }

    public getLogItemsByAbstraction(abstraction_slug: string) {
        return this._http.get(this._api + '/abstraction/' + abstraction_slug).map((res)=>res.json());
    }    

    public getAbstractions() {
        return this._http.get('http://localhost:4200/abstractions/').map((res)=>res.json());
    }    

    public getLogsList() {
        return this._http.get(this._api + '/').map((res)=>res.json());
    }

}
