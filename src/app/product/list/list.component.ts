import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MediaQueryService } from '../../../service/media-query.service';
import { CartService } from '../../cart.service';
import { Product, ProductService } from '../../product.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: [ '../../../styles.css', './list.component.css' ],
    encapsulation: ViewEncapsulation.ShadowDom,
    providers: [
        MediaQueryService,
        { provide: 'mediaQuery', useValue: 'screen and (prefers-reduced-data: no-preference), print' }
    ],
    animations: [
        trigger('openClose', [
            state('open', style({
                height: '200px',
                opacity: 1,
                backgroundColor: 'yellow'
            })),
            state('closed', style({
                height: '100px',
                opacity: 0.8,
                backgroundColor: 'blue'
            })),
            transition('* => closed', [
                animate('1s')
            ]),
            transition('* => open', [
                animate('0.5s')
            ]),
        ]),
    ],
})
export class ListComponent implements OnInit
{
    products: Product[] = [];

    constructor(
        private cartService: CartService,
        private productService: ProductService,
        private mediaQueryService: MediaQueryService,
    ) {}

    get showImages(): boolean
    {
        return this.mediaQueryService.matches;
    }

    get location()
    {
        return location;
    }

    public async ngOnInit(): Promise<void>
    {
        this.products = await this.productService.products;
    }

    share(product: Product)
    {
        window.alert(`${product.title} has been shared!`);
    }

    onNotify(product: Product)
    {
        window.alert(`You will be notified when ${product.title} goes on sale`);
    }

    addToCart(product: Product)
    {
        this.cartService.add(product);
    }
}
