import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DrinkComponent } from './drink/drink.component';
import { CartComponent } from './cart/cart.component';
import { BoxChatComponent } from './boxChat/boxChat.component';

let Components = [
    CartComponent,
    AboutComponent,
    HomeComponent,
    MenuComponent,
    DrinkComponent,
    BoxChatComponent
];

let ComponentsObj = {
    BoxChatComponent:BoxChatComponent,
    AboutComponent: AboutComponent,
    HomeComponent: HomeComponent,
    MenuComponent: MenuComponent,
    DrinkComponent: DrinkComponent
}
export default {
    list : Components,
    obj : ComponentsObj
};