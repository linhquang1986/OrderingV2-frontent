import { Injectable } from '@angular/core';
import { AppState } from '../reduxStore/initStore';
import { NgRedux } from 'ng2-redux';
import { Broadcaster } from './myEmittor.service';
import message from '../models/message';
import * as _ from 'lodash';

declare var responsiveVoice: any;

@Injectable()
export class HandleResultWitAi {
    userSubmit: boolean;
    noteBill: boolean;
    constructor(
        private ngRedux: NgRedux<AppState>,
        private broadcaster: Broadcaster
    ) {
        this.userSubmit = this.ngRedux.getState().userSubmit;
        this.noteBill = this.ngRedux.getState().noteBill;

        this.ngRedux.subscribe(() => {
            this.userSubmit = this.ngRedux.getState().userSubmit;
            this.noteBill = this.ngRedux.getState().noteBill;
        })
    }

    checkEntities(entities) {
        console.log(entities);
        let type_action = null;
        // kiem tra va gan du lieu vao entities
        if (entities.drinks) {
            entities._drink = entities.drinks[0].value;
            entities._quanlity = entities.numbers ? entities.numbers[0].value : 1
        }
        // kiem tra thuoc hanh dong nao?
        if (entities._add) {
            type_action = "add"
        }
        if (entities._special && entities.question) {
            type_action = "list_special"
        }
        else if (entities._remove) {
            type_action = "xoa"
        }
        else {
            type_action = entities.option ? entities.option[0].value : 'add';
        }

        switch (type_action) {
            case "add":
                this.handleOrder(entities);
                break;
            // case "xoa":
            //     changeOrder(entities)
            //     break;
            case "no": // tu choi 1 hanh dong
                if (this.userSubmit) {
                    this.order();
                }
                //console.log('du roi', type_action);
                //showBillAndNote()//show bill and hoi chu thich gi them khong?
                break;
            case "có":
                if (this.userSubmit) {
                    this.setState('setNoteBill', true);
                }
                break;
            case "list_special":
                this.showListSpecial();
                break;
        }
    }

    // quesDrink(entities) {
    //     this.speak('Có bạn');
    //     saveEntities = entities;
    // }

    handleMenu(menu) {
        console.log(this.ngRedux.getState())
        console.log(menu)
        // let exist = menuDrink.find(m => {
        //     return m.name.toLowerCase() == menu.toLowerCase();
        // })
        // if (exist) {
        //     speak('Bạn muốn dùng loại ' + menu + ' nào?')
        // } else {
        //     speak('Hiện bên mình chưa có bạn vui lòng chọn nước khác nha.')
        // }
    }

    speak(text) {
        responsiveVoice.speak(text, "Vietnamese Male");
        this.broadcaster.broadcast('botChat', text);
    }

    handleOrder(entities) {
        let drinks = this.ngRedux.getState().drinks;
        let drinkOder = {
            name: entities._drink,
            quanlity: entities._quanlity
        }
        if (drinkOder.name) {
            let exist = _.find(drinks, d => {
                return d.name.toLowerCase() === drinkOder.name.toLowerCase();
            })
            if (exist) {

                this.ngRedux.dispatch({ type: 'addCart', data: _.merge(drinkOder, _.clone(exist)) })
            }
            else
                this.speak(message.outofdrink);
        }
    }

    showListSpecial() {
        let drinks = this.ngRedux.getState().drinks;
        _.find(drinks, d => {
            if (d.best)
                this.broadcaster.broadcast('flickerAccess', { id: d._id })
        })
    }

    setState(type, value) {
        this.ngRedux.dispatch({ type: type, data: value });
    }

    order() {
        this.speak(message.order)
        this.setState('clearCart', null);
    }
}