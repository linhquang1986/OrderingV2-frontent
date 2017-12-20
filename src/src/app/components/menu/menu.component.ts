import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../shared/menu.service';
import { Menu } from '../../models/menu';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
    private menu: Menu[] = [];
    constructor(private menuService: MenuService) { }

    ngOnInit() {
        let that = this;
        this.menuService.getAll().then(data => {
            data.forEach(d => {
                let row = {} as Menu;
                row._id = d._id;
                row.name = d.name;
                row.best = d.best;
                row.expressions = d.expressions;
                that.menu.push(row)
            })
            console.log(that.menu)
        })
    }
}