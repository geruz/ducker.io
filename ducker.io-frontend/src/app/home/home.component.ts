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
  ) { }

  public ngOnInit() {

  }

  public ngAfterViewInit() {

  }


}