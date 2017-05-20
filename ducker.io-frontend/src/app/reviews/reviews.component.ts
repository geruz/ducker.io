import {
  Component,
  AfterViewInit,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Router } from '@angular/router';

import { GetReviewsService } from './services/getReviews.service';

import opros from '../../assets/mock-data/opros.json';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['reviews.component.scss']
})
export class ReviewsComponent implements OnInit, AfterViewInit {

  public showLoading = false;

  public PageTitle = 'Опросы';
  public PageSubTitle = 'Новая страница лота, объявления и тендера';

  public container = opros;

  public StorageReviews: any;
  public StorageSize = 0;

  public counterInfoLow = 0;


  constructor(
    private router: Router,
    private _reviews: GetReviewsService
  ) {

  }

  public ngOnInit() {
    this.NormalizeReviews();
  }

  public ngAfterViewInit() {

  }

  public clearReviews() {
    this.StorageReviews = null;
    this.container = null;
  }

  public NormalizeReviewsInside() {

    this.showLoading = true;
    

    let exit = this.container.replace(/Отметка времени/gi, "timestamp"); 
    exit = exit.replace(/Как Покупатель оцените информативность. «Я быстро нахожу на странице и понимаю о чём это...»/gi, "informativity"); 
    exit = exit.replace(/Как Покупатель оцените работу функций на странице лота. Отмечайте только те, что вы проверили. «Я могу сделать и это работает \(следующий вопрос будет про не сработало\)»/gi, "functions"); 
    exit = exit.replace(/Если функции не сработали. Отмечайте только те, что вы проверили. «Я не могу это сделать...»/gi, "errors"); 
    exit = exit.replace(/Каковы ваши общие впечатления о странице/gi, "feelings"); 
    exit = exit.replace(/Устройство, на котором вы смотрите аукцион/gi, "device"); 
    exit = exit.replace(/Ваше имя пользователя \(логин\) на аукционе/gi, "username");
    exit = exit.replace(/Ваши замечания и комментарии по странице/gi, "comment");

    this.StorageReviews = JSON.parse(exit);

    this.StorageReviews.forEach(function(element,index) {

      let _errors = element['errors'].split(';');
      let _tempStorage_errors = [];
      _errors.forEach(function(element2,index2) {
        _tempStorage_errors.push(element2);
      });

      element['errors'] = _errors;

      let _feelings = element['feelings'].split(';');
      let _tempStorage_feelings = [];
      _feelings.forEach(function(element2,index2) {
        _tempStorage_feelings.push(element2);
        console.log('element2: ' + element2);
      });

      element['feelings'] = _feelings;

    });

    this.showLoading = false;
    
  }

  public NormalizeReviews() {

    this.showLoading = true;

    return this._reviews.getReviewsData().subscribe(_result=> {
        let temp = JSON.stringify(_result);
        // console.log('temp: ' + temp);

        let exit = temp.replace(/Отметка времени/gi, "timestamp"); 
        exit = exit.replace(/Как Покупатель оцените информативность. «Я быстро нахожу на странице и понимаю о чём это...»/gi, "informativity"); 
        exit = exit.replace(/Как Покупатель оцените работу функций на странице лота. Отмечайте только те, что вы проверили. «Я могу сделать и это работает \(следующий вопрос будет про не сработало\)»/gi, "functions"); 
        exit = exit.replace(/Если функции не сработали. Отмечайте только те, что вы проверили. «Я не могу это сделать...»/gi, "errors"); 
        exit = exit.replace(/Каковы ваши общие впечатления о странице/gi, "feelings"); 
        exit = exit.replace(/Устройство, на котором вы смотрите аукцион/gi, "device"); 
        exit = exit.replace(/Ваше имя пользователя \(логин\) на аукционе/gi, "username");
        exit = exit.replace(/Ваши замечания и комментарии по странице/gi, "comment");

        this.StorageReviews = JSON.parse(exit);

        let _counterReviews = 0;

        this.StorageReviews.forEach(function(element,index) {

          _counterReviews++;

          let _errors = element['errors'].split(';');
          let _tempStorage_errors = [];
          _errors.forEach(function(element2,index2) {
            _tempStorage_errors.push(element2);
          });

          element['errors'] = _errors;

          let _feelings = element['feelings'].split(';');
          let _tempStorage_feelings = [];
          _feelings.forEach(function(element2,index2) {
            _tempStorage_feelings.push(element2);
            // console.log('element2: ' + element2);
          });

          element['feelings'] = _feelings;

        });

        this.showLoading = false;

        this.StorageSize = _counterReviews;
    });
  }


}


/*
                    <div class="col-12" *ngIf="!StorageReviews">
                        <div class="code-area" class="w100">
                            <h4 class="gray-54 mar-b-16">Отрисовать JSON</h4>
                            <textarea autofocus title="Вставьте JSON код прямо сюда" class="jsonElement" [(ngModel)]="container" name="container" (ngModelChange)="NormalizeReviewsInside()"></textarea>
                        </div>
                    </div>

                    */