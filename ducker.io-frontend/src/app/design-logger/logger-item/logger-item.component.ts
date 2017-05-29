import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'logger-item',
    templateUrl: 'logger-item.component.html',
    styleUrls: ['logger-item.component.scss']
})
export class LoggerItemComponent implements OnInit {
  public showLoading = false;

  public PageTitle = 'События';
  public PageSubTitle = 'Утверждение решений';

  public slug: string;

 constructor(
    public route: ActivatedRoute,
    public _router: Router,
    ) {}  

  public ngOnInit() {

    this.route.params.forEach((params:Params) => {

        this.slug = params['slug'];

        console.log('this slug: ' + this.slug);

    });

  }


}
