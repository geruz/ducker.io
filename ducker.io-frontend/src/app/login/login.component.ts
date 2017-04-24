import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-login',
    templateUrl: 'login.component.html',
    providers: [ AuthService ]
})
export class LoginComponent implements OnInit {

    public returnUrl: string;

    public username = '';
    public userpass = '';

    public nameStatus = 'false';
    public sendingStatus = '';

    constructor(private _auth: AuthService, private route: ActivatedRoute, private router: Router) {}

    public ngOnInit() {
        console.log('onInit');
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    public onSubmit() {
        console.log('username: ' + this.username);
        console.log('password: ' + this.userpass);

        if(this.username && this.userpass) {

            this._auth.postTest(this.username, this.userpass).subscribe(
                (data) => {
                    console.log('RESULT POST: ' + JSON.stringify(data));
                    if(data !== 'false' && data !== '404') {
                        let inde = JSON.stringify(data);
                        this.sendingStatus = '';
                        localStorage.setItem('currentUser', inde);
                        this.router.navigate([this.returnUrl]);
                    }
                    if(data == 'false') this.sendingStatus = 'false';
                    if(data == '404') this.sendingStatus = '404';
            });

        }
    }

    public ValidationName(event) {
        console.log('event: ' + event);
        let found = new RegExp('^[a-zA-Z][a-zA-Z0-9]*$');
        let ext = found.test(event);
        if(!ext) {
            this.nameStatus = 'true';
        } else this.nameStatus = 'false';
    }

}
