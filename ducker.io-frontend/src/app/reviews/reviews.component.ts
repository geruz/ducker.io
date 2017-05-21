import {
  Component,
  AfterViewInit,
  OnInit,
} from '@angular/core';

import { AppState } from '../app.service';
import { ActivatedRoute, Router, Params } from "@angular/router";
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

  public displayOnlyComments = false;

  public counterStatus = {
    'counterInfoLow': 0,
    'counterInfoHigh': 0,
    'counterVisualLow': 0,
    'counterVisualHigh': 0,
    'counterComfortLow': 0,
    'counterComfortHigh': 0,     
    'counterErrorsLow': 0,
    'counterErrorsHigh': 0,  
  }

  /*
    A N G U L A R   P A R T
  */

  constructor(
    private router: Router,
    private _routeActive: ActivatedRoute,
    private _reviews: GetReviewsService
  ) {

  }

  public ngOnInit() {
    // INIT
    this.NormalizeReviews();
  }

  public ngAfterViewInit() {
    // INIT VIEW
  }

  /*
    C U S T O M
  */  

  public clearReviews() {

    this.StorageReviews = null;
    this.container = null;

    this.counterStatus = {
      'counterInfoLow': 0,
      'counterInfoHigh': 0,
      'counterVisualLow': 0,
      'counterVisualHigh': 0,
      'counterComfortLow': 0,
      'counterComfortHigh': 0,      
      'counterErrorsLow': 0,
      'counterErrorsHigh': 0,       
    }

    this.StorageSize = 0;

  } // end clearReviews


  public NormalizeReviewsInside() {

    this.showLoading = true;
    this.ConvertorJSON(this.container);
 
  } // end NormalizeReviewsInside

  public NormalizeReviews() {

    let storageBuffer = localStorage.getItem('displayOnlyComment');

      if(storageBuffer) {
        this.displayOnlyComments = Boolean(storageBuffer);
      } else {
        localStorage.setItem('displayOnlyComment', 'false');
        console.log('>>> CREATED' + localStorage.getItem('displayOnlyComment'));
      }

    this.showLoading = true;

    return this._reviews.getReviewsData().subscribe(_result=> {
        let temp = JSON.stringify(_result);
        this.ConvertorJSON(temp);
    });

  } // end NormalizeReviews

  public ConvertorJSON(temp) {
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

        let _counterStatus = {
          'counterInfoLow': 0,
          'counterInfoHigh': 0,
          'counterVisualLow': 0,
          'counterVisualHigh': 0,
          'counterComfortLow': 0,
          'counterComfortHigh': 0, 
          'counterErrorsLow': 0,
          'counterErrorsHigh': 0,
       }

        this.StorageReviews.forEach(function(element,index) {
         

          _counterReviews++;

          let _errors = element['errors'].split(';');
          let _tempStorage_errors = [];
          _errors.forEach(function(element2,index2) {
            if(element2 == "Всё сработало") { _counterStatus['counterErrorsHigh']++; element2 = null; }
            else { _counterStatus['counterErrorsLow']++; }
            _tempStorage_errors.push(element2);
          });

          element['errors'] = _tempStorage_errors;

          let _feelings = element['feelings'].split(';');
          let _tempStorage_feelings = [];
          _feelings.forEach(function(element2,index2) {

            if(element2 == 'Информативность ниже ожидаемой') _counterStatus['counterInfoLow']++;
            if(element2 == 'Информативность выше ожиданий') _counterStatus['counterInfoHigh']++;
            if(element2 == 'Визуальное удовольствие ниже ожидаемого') _counterStatus['counterVisualLow']++;
            if(element2 == 'Визуальное удовольствие превосходит ожидания') _counterStatus['counterVisualHigh']++;
            if(element2 == 'Удобство использования ниже ожиданий') _counterStatus['counterComfortLow']++;
            if(element2 == 'Удобство использования выше текущей версии') _counterStatus['counterComfortHigh']++;
            
            _tempStorage_feelings.push(element2);

          });
          

          element['feelings'] = _tempStorage_feelings;


        });
        

        this.showLoading = false;

        this.StorageSize = _counterReviews;
        this.counterStatus['counterInfoLow'] = _counterStatus['counterInfoLow'];
        this.counterStatus['counterInfoHigh'] = _counterStatus['counterInfoHigh'];
        this.counterStatus['counterVisualLow'] = _counterStatus['counterVisualLow'];
        this.counterStatus['counterVisualHigh'] = _counterStatus['counterVisualHigh'];
        this.counterStatus['counterComfortLow'] = _counterStatus['counterComfortLow'];
        this.counterStatus['counterComfortHigh'] = _counterStatus['counterComfortHigh'];         
        this.counterStatus['counterErrorsLow'] = _counterStatus['counterErrorsLow'];
        this.counterStatus['counterErrorsHigh'] = _counterStatus['counterErrorsHigh'];                 
  } // end ConvertorJSON

  public saveDisplayStatus() {

    let temp = !this.displayOnlyComments;

    setTimeout(function() {
      if(temp) localStorage.setItem('displayOnlyComment', 'true');
      else localStorage.removeItem('displayOnlyComment');
    }, 100);

  } // end saveDisplayStatus

} // END OF ALL
