import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-bar',
    templateUrl: 'userbar.component.html',
    styleUrls: ['userbar.component.scss']
})
export class UserbarComponent implements OnInit {

    public SettingsHidder = 'translateX(390px)';

    public ngOnInit() {

    }

    public stateSettings(state: boolean) {
        if(state) {
            // set open
            console.log('OPEN');
            this.SettingsHidder = 'translateX(0px)';
        } else {
            // set close
            console.log('CLOSE');
            this.SettingsHidder = 'translateX(390px)';
        }
    }

}