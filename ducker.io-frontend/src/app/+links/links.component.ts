import {
  Component,
  OnInit,
} from '@angular/core';
import { AppState } from '../app.service';

@Component({
  selector: 'page-links',
  templateUrl: 'links.component.html'
})

export class LinksComponent implements OnInit {

  public username: string;
  public avatar: string;

  private _currentUser: any;

  public constructor(public _state: AppState) {
    this._state.setTitle('Test title');
  }

  public ngOnInit() {
    console.log('Links Loaded');
    this._currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = this._currentUser['login'];
    this.avatar = this._currentUser['avatar'];
  }

}
