import { animate, keyframes, sequence, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MediaQueryService } from '../../../../service/media-query.service';
import { CartService } from '../../../cart.service';
import { Product } from '../../../product.service';

@Component({
    selector: 'app-product-list-item[product]',
    templateUrl: './item.component.html',
    styleUrls: [ '../../../../styles.css', './item.component.css' ],
    encapsulation: ViewEncapsulation.ShadowDom,
    providers: [
        MediaQueryService,
        { provide: 'mediaQuery', useValue: 'screen and (prefers-reduced-data: no-preference), print' },
    ],
    host: {
        '(@addToCart.start)': 'captureStartEvent($event)',
    },
    animations: [
        trigger('addToCart', [
            transition('* => adding', [
                sequence([
                    animate('.8s ease-in-out', keyframes([
                        style({
                            position: 'fixed',
                            insetBlockStart: '{{ positionY }}px',
                            insetInlineStart: '{{ positionX }}px',
                            zIndex: 10000,
                            scale: 1,
                            opacity: 1,
                        }),
                        style({ insetBlockStart: '-100px', insetInlineStart: '100%', scale: .2, opacity: 0 })
                    ])),
                    animate('.5s .8s ease-in-out', keyframes([
                        style({
                            position: 'relative',
                            insetBlockStart: 'auto',
                            insetInlineStart: 'auto',
                            scale: 1,
                            opacity: 0
                        }),
                        style({ opacity: 1 }),
                    ])),
                ]),
            ]),
        ]),
    ],
})
export class ItemComponent implements OnInit
{
    @Input() product!: Product;

    state: 'idle'|'adding' = 'idle';

    constructor(
        private elementRef: ElementRef,
        private cartService: CartService,
        private mediaQueryService: MediaQueryService,
    )
    {
    }

    get showImage(): boolean
    {
        return this.mediaQueryService.matches;
    }

    get location()
    {
        return location;
    }

    get position()
    {
        return this.elementRef.nativeElement.getBoundingClientRect();
    }

    ngOnInit(): void
    {
    }

    share(product: Product)
    {
        window.alert(`${product.title} has been shared!`);
    }

    onNotify(product: Product)
    {
        window.alert(`You will be notified when ${product.title} goes on sale`);
    }

    async addToCart(product: Product)
    {
        this.state = 'idle';
        setTimeout(() => this.state = 'adding', 0);

        this.cartService.add(product);
    }

    captureStartEvent(e: any)
    {
        console.log(e);
    }

    captureDoneEvent(e: any)
    {
        console.log(e);
    }
}
