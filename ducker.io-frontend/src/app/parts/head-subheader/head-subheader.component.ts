import {
    Component, Input
} from '@angular/core';

@Component({
    selector: 'head-subheader',
    inputs: ['hero'],
    templateUrl: './head-subheader.component.html'
})
export class HeadSubheaderComponent  {
    @Input() public hero: string;
}
