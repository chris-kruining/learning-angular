import { Injectable } from '@angular/core';
import { Product } from './products';

export interface Item extends Product
{
    quantity: number;
}

@Injectable({
    providedIn: 'root',
})
export class CartService
{
    private items: Item[] = [];

    constructor()
    {
        this.items = JSON.parse(sessionStorage.getItem('cart') ?? '[]') as Item[];
    }

    addToCart(product: Product, quantity: number = 1)
    {
        this.items.push({ ...product, quantity });

        this.persist();
    }

    getItems(): Item[]
    {
        return this.items;
    }

    clearCart(): void
    {
        this.items = [];

        this.persist();
    }

    private persist(): void
    {
        sessionStorage.setItem('cart', JSON.stringify(this.items));
    }
}
