import { Component, OnInit } from '@angular/core';
import { Product, products } from '../../products';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../cart.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './detail.component.html',
    styleUrls: [ './detail.component.css' ],
})
export class DetailComponent implements OnInit
{
    product: Product|undefined;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private cartService: CartService,
    ) {}

    ngOnInit(): void
    {
        const routeParams = this.route.snapshot.paramMap;
        const productId = Number(routeParams.get('id'));

        this.product = products.find((p) => p.id === productId);
    }

    addToCart(product: Product)
    {
        this.cartService.addToCart(product);

        this.router.navigate([ '/cart' ]);
    }
}
