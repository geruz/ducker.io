import { Component, Input } from '@angular/core';

@Component({
    selector: 'user-favorites',
    templateUrl: 'favorites.component.html',
    styleUrls: ['favorites.component.scss']
})
export class FavoritesComponent {
    @Input('title') ElementTitle: 'Без названия';
    @Input('subtitle') ElementSubTitle: string;
    @Input('thumb') ElementThumbnail: string;
}
