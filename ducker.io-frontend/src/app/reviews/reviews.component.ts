import {
  Component,
  AfterViewInit,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['reviews.component.scss']
})
export class ReviewsComponent implements OnInit, AfterViewInit {

  public PageTitle = 'Опросы';
  public PageSubTitle = 'Новая страница лота, объявления и тендера';

  public Reviews = [
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },
    { 
      'timestamp': '231131',
      'username': 'admin',
      'comment': 'Комментарий' 
    },

  ];

  constructor(
    private router: Router
  ) {

  }

  public ngOnInit() {

  }

  public ngAfterViewInit() {

  }


}
