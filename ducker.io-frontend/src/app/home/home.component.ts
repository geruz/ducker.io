import {
  Component,
  AfterViewInit,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {

  public localState = { value: '' };
  public localDataBase: any;

  public PageTitle = 'Главная страница';
  public PageSubTitle = 'Главная страница';

  public test = [
    { title: 'Привет' },
    { title: 'Привет 3' },
    { title: 'Привет 5' }
  ]

  constructor(
    public appState: AppState,
    private router: Router
  ) {

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