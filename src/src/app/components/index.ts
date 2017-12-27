import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { BoxChatComponent } from './boxChat/boxChat.component';

let Components = [
    CartComponent,
    AboutComponent,
    HomeComponent,
    MenuComponent,
    BoxChatComponent
];

let ComponentsObj = {
    BoxChatComponent:BoxChatComponent,
    AboutComponent: AboutComponent,
    HomeComponent: HomeComponent,
    MenuComponent: MenuComponent
}
export default {
    list : Components,
    obj : ComponentsObj
};