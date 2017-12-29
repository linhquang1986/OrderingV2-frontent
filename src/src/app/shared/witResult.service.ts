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
    confirmOrder: boolean;
    constructor(
        private ngRedux: NgRedux<AppState>,
        private broadcaster: Broadcaster
    ) {
        this.userSubmit = false;
        this.noteBill = this.ngRedux.getState().noteBill;
        this.confirmOrder = false;

        this.ngRedux.subscribe(() => {
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
            type_action = "add";
        }
        if (entities._special && entities.question) {
            type_action = "list_special";
        }
        if (entities._remove) {
            type_action = "xoa";
        }
        if (type_action == null && entities.menus) {
            type_action = 'chooseMenu';
        }
        if (entities._have) {
            if (entities.menus)
                type_action = 'chooseMenu';
            if (entities._drink)
                type_action = "add";
        }
        if (type_action == null) {
            if (entities.option)
                type_action = entities.option[0].value;
        }
        if (!this.ngRedux.getState().noteBill) {
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
                    if(this.confirmOrder) {
                        this.confirmOrder = false;
                        this.userSubmit = true;
                        this.broadcaster.broadcast('clearWaiting');
                        this.speak(message.note);
                    }
                    //console.log('du roi', type_action);
                    //showBillAndNote()//show bill and hoi chu thich gi them khong?
                    break;
                case "có":
                    if (this.userSubmit) {
                        this.setState('setNoteBill', true);
                        this.broadcaster.broadcast('clearWaiting');                        
                    }
                    break;
                case "list_special":
                    this.showListSpecial();
                    break;
                case "chooseMenu":
                    this.handleMenu(entities.menus[0].value);
                    break;
                default: this.handleOrder(entities);
            }
        }
    }

    // quesDrink(entities) {
    //     this.speak('Có bạn');
    //     saveEntities = entities;
    // }

    handleMenu(menu) {
        let exist = this.ngRedux.getState().menus.find(m => {
            return m.name.toLowerCase() == menu.toLowerCase();
        })
        if (exist) {
            this.speak('Bạn muốn dùng loại ' + menu + ' nào?')
        } else {
            this.speak('Hiện bên mình chưa có bạn vui lòng chọn nước khác nha.')
        }
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
        else {
            this.speak(message.outofdrink);
        }
    }

    showListSpecial() {
        this.speak(message.nofifySpecial);
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
        this.confirmOrder = false;
        this.userSubmit = false;
    }
}