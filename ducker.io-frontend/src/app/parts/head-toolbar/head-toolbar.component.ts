import {
    Component,
    OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'head-toolbar',
    templateUrl: './head-toolbar.component.html'
})
export class HeadToolbarComponent implements OnInit {

    public localState: any;
    public searchLine: string;

    constructor(
        public route: ActivatedRoute,
    ) {
        this.searchLine = 'Поиск';
    }

    public ngOnInit() {
        this.route
            .data
            .subscribe((data: any) => {
                // your resolved data from route
                this.localState = data.yourData;
            });
    }

    public setClear() {
        this.searchLine = '';
    }

    public findSome(event) {
        console.log(event);
    }

}
