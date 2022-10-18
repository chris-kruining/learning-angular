import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService, Item } from '../cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: [ './cart.component.css' ],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class CartComponent
{
    checkoutForm: FormGroup;

    constructor(
        private cartService: CartService,
        private formBuilder: FormBuilder,
    )
    {
        this.checkoutForm = this.formBuilder.group({ name: '', address: '' });
    }

    get items()
    {
        return this.cartService.items;
    }

    remove(item: Item)
    {
        this.cartService.remove(item.id);
    }

    onSubmit(): void
    {
        this.cartService.clear();

        console.warn('Your order has been submitted', this.checkoutForm.value);

        this.checkoutForm.reset();
    }
}
