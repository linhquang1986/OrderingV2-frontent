import { Directive, ElementRef, Renderer, Input, HostListener } from "@angular/core";
import { Drink } from '../../models/drink';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../../reduxStore/initStore';
import { Broadcaster } from '../../shared/myEmittor.service';
import * as _ from 'lodash';

@Directive({
    selector: '[drink]'
})

export class DrinkDirective {
    @Input() drink: Drink;
    private nativeElement: Node;

    constructor(
        public el: ElementRef,
        public renderer: Renderer,
        private ngRedux: NgRedux<AppState>,
        private broadcaster: Broadcaster
    ) {
        this.nativeElement = el.nativeElement;
    }

    addCart() {
        this.flickerAccess();
        this.ngRedux.dispatch({ type: 'addCart', data: _.clone(this.drink) });
    }

    flickerAccess() {
        this.renderer.setElementClass(this.nativeElement, 'animate-flicker', true);
        setTimeout(() => {
            this.renderer.setElementClass(this.nativeElement, 'animate-flicker', false);
        }, 2000);
    }

    @HostListener('click') onclick() {
        this.addCart();
    }

    ngOnInit() {
        this.renderer.createText(this.nativeElement, this.drink.name);

        this.broadcaster.on<any>('flickerAccess').subscribe(value => {
            if (value.id === this.drink._id) {
                this.flickerAccess();
            }
        }, err => {
            console.log(err)
        }, () => {
            console.log('123123')
        })
    }
}