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

  public constructor(public _state: AppState) {
    this._state.setTitle('Test title');
  }

  public ngOnInit() {
    console.log('Links Loaded');
  }

}
