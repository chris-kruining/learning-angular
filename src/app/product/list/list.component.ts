import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../product.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: [ './list.component.css' ],
})
export class ListComponent implements OnInit
{
    products: Product[] = [];

    constructor(
        private productService: ProductService
    ) {}

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
}
