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
    items: Item[];

    constructor(
        private cartService: CartService,
        private formBuilder: FormBuilder,
    ) {
        this.checkoutForm = this.formBuilder.group({ name: '', address: '' })

        this.items = this.cartService.items;
    }

    onSubmit(): void
    {
        this.cartService.clear();
        this.items = [];

        console.warn('Your order has been submitted', this.checkoutForm.value);

        this.checkoutForm.reset();
    }
}
