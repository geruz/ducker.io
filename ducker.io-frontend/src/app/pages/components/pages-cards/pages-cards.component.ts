import { Component, Input } from '@angular/core';

@Component({
    selector: 'pages-cards',
    templateUrl: 'pages-cards.component.html',
    styleUrls: ['pages-cards.component.scss']
})
export class PagesCardsComponent {
    @Input('DocumentRendered') DocumentRendered: any;
    @Input('PagesSorting') PagesSorting: any;
}
