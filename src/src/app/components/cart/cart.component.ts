import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
//import * as _ from 'lodash';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../../reduxStore/initStore';
import { HandleResultWitAi } from '../../shared/witResult.service';
import { Broadcaster } from '../../shared/myEmittor.service';
import message from '../../models/message';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
    cart: CartItem[];
    noteText = [];
    watting;
    waitingnote;

    constructor(
        private ngRedux: NgRedux<AppState>,
        private AI: HandleResultWitAi,
        private broadcaster: Broadcaster
    ) {
        this.cart = this.ngRedux.getState().cart;
        this.noteText = this.ngRedux.getState().noteText;
    }

    removeDrink(id) {
        this.ngRedux.dispatch({ type: 'removeDrink', id: id })
    }

    ngOnInit() {
        this.ngRedux.subscribe(() => {
            this.cart = this.ngRedux.getState().cart;
            this.noteText = this.ngRedux.getState().noteText;
            if (this.cart.length > 0 && !this.AI.noteBill) {
                this.AI.confirmOrder = true;
                clearTimeout(this.watting);
                this.watting = this.wattingOrder();
            }
        });

        this.broadcaster.on<any>('clearWaiting').subscribe(() => {
            clearTimeout(this.watting);
        });

        this.broadcaster.on<any>('clearWaitingNote').subscribe(() => {
            clearTimeout(this.waitingnote);
            this.waitingNote();
        });

        this.broadcaster.on<any>('clearNote').subscribe(() => {
            clearTimeout(this.waitingnote);
        });
    }

    wattingOrder() {
        let that = this;
        return setTimeout(() => {
            that.AI.speak(message.confirm);
        }, 5000);
    }

    waitingNote() {
        let that = this;
        return setTimeout(() => {
            that.AI.order();
        }, 10000)
    }

    setState(type, value) {
        this.ngRedux.dispatch({ type: type, data: value });
    }

    submit() {
        clearTimeout(this.watting);
        if (this.noteText.length > 0) {
            this.AI.order();
            this.noteText = []
        } else {
            this.AI.speak(message.notifyNote);
            this.setState('setNoteBill', true);
            this.waitingnote = this.waitingNote();
        }
    }
}