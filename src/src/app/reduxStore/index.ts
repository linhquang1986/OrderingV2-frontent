//import { Drink } from './models/drink'
import { CartItem } from '../models/cartItem';
import * as _ from 'lodash';
import { AppState } from './initStore'

function addCart(state, value, cb) {
    let exist = _.find(state.cart, c => {
        return c.drink._id === value._id
    })
    if (!exist) {
        let _c = new CartItem();
        _c.drink = value;
        _c.price = parseInt(value.price);
        _c.quanlity = parseInt(value.quanlity ? value.quanlity : 1);
        state.cart.push(_c);
        cb(state)
    } else {
        _.find(state.cart, c => {
            if (c.drink._id === value._id) {
                c.quanlity += parseInt(value.quanlity ? value.quanlity : 1);
                c.price = c.drink.price * c.quanlity;
            }
        })
        cb(state)
    }
}

export function rootReducer(state: AppState, action): AppState {
    switch (action.type) {
        case 'addNoteText':
            state.noteText.push(action.data);
            return state;

        case 'setNoteBill':
            state.noteBill = action.data;
            return state;

        case 'clearCart':
            state.cart = [];
            state.userSubmit = false;
            state.noteText = [];
            state.noteBill = false;
            return state;

        case 'setUserSubmit':
            state.userSubmit = action.data;
            return state;

        case 'initDrinks':
            state.drinks = _.clone(action.data);
            return state;

        case 'initMenus':
            state.menus = _.clone(action.data);
            return state;

        case 'addCart':
            addCart(state, action.data, (state) => {
                return state;
            })

        case 'removeDrink':
            _.remove(state.cart, d => {
                return d.drink._id === action.id;
            })
            return state;
    }
    return state;
}