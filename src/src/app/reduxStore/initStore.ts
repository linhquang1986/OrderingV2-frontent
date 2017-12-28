import { CartItem } from '../models/cartItem';
import { Menu } from '../models/menu';
import { Drink } from '../models/drink';

export let INIT_STORE = {
    cart: [],
    drinks: [],
    menus: [],
    noteBill: false,
    noteText: []
}

export interface AppState {
    cart: CartItem[];
    drinks: Drink[];
    menus: Menu[];
    noteBill: boolean;
    noteText: String[];
}