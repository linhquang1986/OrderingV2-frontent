import { Component, OnInit, Input } from '@angular/core';
import { Drink } from '../../models/drink';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../../reduxStore/initStore';
import { Broadcaster } from '../../shared/myEmittor.service';
import * as _ from 'lodash';

@Component({
    selector: 'drink',
    templateUrl: './drink.component.html',
    styleUrls: ['./drink.component.scss']
})

export class DrinkComponent implements OnInit {
    @Input() data: Drink
    flicker = false;

    constructor(
        private ngRedux: NgRedux<AppState>,
        private broadcaster: Broadcaster
    ) {
    }

    addCart() {
        this.flickerAccess();
        this.ngRedux.dispatch({ type: 'addCart', data: _.clone(this.data) });
    }

    flickerAccess() {
        this.flicker = true;
        setTimeout(() => {
            this.flicker = false;
        }, 2000);
    }

    ngOnInit() {
        this.broadcaster.on<any>('flickerAccess').subscribe(value => {
            if (value.id === this.data._id) {
                this.flickerAccess();
            }
        }, err => {
            console.log(err)
        }, () => {
            console.log('123123')
        })
    }
}