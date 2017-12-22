import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../shared/menu.service';
import { Menu } from '../../models/menu';
import { Drink } from '../../models/drink';
import { AppState } from '../../reduxStore/initStore';
import { NgRedux } from 'ng2-redux';
//import * as _ from 'lodash';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
    menus: Menu[] = [];
    constructor(
        private menuService: MenuService,
        private ngRedux: NgRedux<AppState>
    ) { }

    ngOnInit() {
        let that = this;
        this.menuService.getAllMenu().then(data => {
            data.forEach(d => {
                let row = {} as Menu;
                row._id = d._id;
                row.name = d.name;
                row.best = d.best;
                row.expressions = d.expressions;
                row.drinks = [];
                that.menus.push(row)
            })
        })

        this.menuService.getAllDrink().then(data => {
            data.forEach(d => {
                let row = new Drink();
                row._id = d._id;
                row.name = d.name;
                row.best = d.best;
                row.expressions = d.expressions;
                row.menu = d.menu;
                row.price = d.price;
                this.menus.forEach(m => {
                    if (m._id == d.menu)
                        m.drinks.push(row);
                })
            })
            this.ngRedux.dispatch({ type: 'initMenus', data: this.menus });
            this.ngRedux.dispatch({ type: 'initDrinks', data: data });
        })
    }
}