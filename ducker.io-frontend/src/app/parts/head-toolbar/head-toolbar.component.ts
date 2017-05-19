import {
    Component,
    OnInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'head-toolbar',
    templateUrl: './head-toolbar.component.html'
})
export class HeadToolbarComponent implements OnInit {

    public localState: any;
    public searchLine: string;
    public _currentUser: any;
    public _avatar: string;

    constructor(
        public route: ActivatedRoute,
        private router: Router,
    ) {
        this.searchLine = 'Поиск';
        this._currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this._avatar = this._currentUser['avatar'];
    }

    public ngOnInit() {
        this.route
            .data
            .subscribe((data: any) => {
                // your resolved data from route
                // this.localState = data.yourData;
                
            });
    }

    public setClear() {
        this.searchLine = '';
    }

    public findSome(event) {
        console.log(event);
    }

    public logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }    

}
