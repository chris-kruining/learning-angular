import { Component } from '@angular/core';
import { Product, products } from '../../products';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: [ './list.component.css' ],
})
export class ListComponent
{
    products: Product[] = [ ...products ];

    share(product: Product)
    {
        window.alert(`${product.name} has been shared!`);
    }

    onNotify(product: Product)
    {
        window.alert(`You will be notified when ${product.name} goes on sale`);
    }
}
