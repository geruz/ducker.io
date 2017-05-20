import { Component, OnInit } from '@angular/core';

import { LeftSideService } from './left-side.service';

@Component({
    selector: 'left-side',
    templateUrl: 'left-side.component.html',
    styleUrls: ['left-side.component.scss']
})
export class LeftSideComponent implements OnInit {

    public lastedit = '---- / -- / --'

    constructor(public _lefty: LeftSideService) {}

    public ngOnInit() {
        
        this._lefty.getLastEditData().subscribe((result) => {
            this.lastedit = result['lastedit'];
        })

    }

}