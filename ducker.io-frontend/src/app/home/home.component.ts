import {
  Component,
  AfterViewInit,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { Router } from '@angular/router';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
  // Set our default values
  public localState = { value: '' };
  public localDataBase: any;
  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title,
    private router: Router
  ) {

    this.appState.getCalendarAll().subscribe(
      (data) => {
        this.localDataBase = data;
        console.log('HOME COMP > constructor { ' + this.localDataBase + ' } < HOME COMP');
      });
  }

  public ngOnInit() {
    console.log('hello `Home` component');

    localStorage.setItem('test_key', 'data of key test');
    console.log('local: ' + localStorage.getItem('currentUser'));
    // this.title.getData().subscribe(data => this.data = data);
  }

  public ngAfterViewInit() {

  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.localState.value = '';
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

}