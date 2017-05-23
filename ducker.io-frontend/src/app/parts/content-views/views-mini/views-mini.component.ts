import { Component, Input } from '@angular/core';

@Component({
    selector: 'views-mini',
    templateUrl: 'views-mini.component.html',
    styleUrls: ['views-mini.component.scss']
})
export class ViewsMiniComponent {
    @Input('InputDataContainer') InputDataContainer: any; 
    
}
