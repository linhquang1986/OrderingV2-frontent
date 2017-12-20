import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

let Components = [
    AboutComponent,
    HomeComponent,
    MenuComponent
];

let ComponentsObj = {
    AboutComponent: AboutComponent,
    HomeComponent: HomeComponent,
    MenuComponent: MenuComponent
}
export default {
    list : Components,
    obj : ComponentsObj
};