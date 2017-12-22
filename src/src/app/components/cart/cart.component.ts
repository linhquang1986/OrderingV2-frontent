import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
//import * as _ from 'lodash';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../../reduxStore/initStore';
import { HandleResultWitAi } from '../../shared/witResult.service';
import message from '../../models/message';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
    cart: CartItem[];
    noteText = [];
    userSubmit: boolean;
    constructor(
        private ngRedux: NgRedux<AppState>,
        private AI: HandleResultWitAi
    ) {
        this.cart = this.ngRedux.getState().cart;
        this.noteText = this.ngRedux.getState().noteText;
        this.userSubmit = this.ngRedux.getState().userSubmit;        
    }

    removeDrink(id) {
        this.ngRedux.dispatch({ type: 'removeDrink', id: id })
    }

    ngOnInit() {
        this.ngRedux.subscribe(() => {
            this.userSubmit = this.ngRedux.getState().userSubmit;
            this.cart = this.ngRedux.getState().cart;
            this.noteText = this.ngRedux.getState().noteText;
        })
    }

    setState(type, value) {
        this.ngRedux.dispatch({ type: type, data: value });
    }

    submit() {
        if (this.noteText.length > 0) {
            this.AI.order();
            this.noteText = []
        } else {
            this.setState('setUserSubmit', true);
            this.AI.speak(message.note);
        }
    }
}