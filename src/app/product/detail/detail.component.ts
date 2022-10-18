import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart.service';
import { Product, ProductService } from '../../product.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './detail.component.html',
    styleUrls: [ '../../../styles.css', './detail.component.css' ],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class DetailComponent implements OnInit
{
    product?: Product;

    constructor(
        private route: ActivatedRoute,
        private cartService: CartService,
        private productService: ProductService,
    )
    {
    }

    public async ngOnInit(): Promise<void>
    {
        const id = Number(this.route.snapshot.paramMap.get('id'));

        this.product = (
            await this.productService.products
        ).find(p => p.id === id);
    }

    addToCart(product: Product)
    {
        this.cartService.add(product);
    }
}
