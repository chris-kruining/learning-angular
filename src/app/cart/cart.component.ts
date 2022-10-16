import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService, Item } from '../cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: [ './cart.component.css' ],
})
export class CartComponent
{
    items!: Item[];

    checkoutForm = this.formBuilder.group({
        name: '',
        address: ''
    });

    constructor(
        private cartService: CartService,
        private formBuilder: FormBuilder,
    ) {
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
