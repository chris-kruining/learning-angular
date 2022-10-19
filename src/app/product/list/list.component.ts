import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MediaQueryService } from '../../../service/media-query.service';
import { CartService } from '../../cart.service';
import { Product, ProductService } from '../../product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './list.component.html',
    styleUrls: [ '../../../styles.css', './list.component.css' ],
    encapsulation: ViewEncapsulation.ShadowDom,
    providers: [
        MediaQueryService,
        { provide: 'mediaQuery', useValue: 'screen and (prefers-reduced-data: no-preference), print' },
    ],
})
export class ListComponent implements OnInit
{
    products: Product[] = [];

    constructor(
        private productService: ProductService,
        private mediaQueryService: MediaQueryService,
    )
    {
    }

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
}
