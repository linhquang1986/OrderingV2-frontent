import { DrinkDirective } from './drink';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        DrinkDirective
    ],
    exports: [
        DrinkDirective
    ]
})

export class Directives { }