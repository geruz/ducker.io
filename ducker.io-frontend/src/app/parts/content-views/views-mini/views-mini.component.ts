import { Component, Input } from '@angular/core';

@Component({
    selector: 'views-mini',
    templateUrl: 'views-mini.component.html',
    styleUrls: ['views-mini.component.scss']
})
export class ViewsMiniComponent {
    @Input('InputDataContainer') InputDataContainer: any; 
    public categoryOpacity = '0';

    public toggleCategoryOpacity(status: string) {
        if(status) this.categoryOpacity = '1';
        else this.categoryOpacity = '0';
    }
}
