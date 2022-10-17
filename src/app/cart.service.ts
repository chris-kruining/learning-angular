import { Injectable } from '@angular/core';
import { Product } from './product.service';

export interface Item extends Product
{
    quantity: number;
}

@Injectable({
    providedIn: 'root',
})
export class CartService
{
    #items: Item[] = [];

    constructor()
    {
        this.#items = JSON.parse(sessionStorage.getItem('cart') ?? '[]') as Item[];
    }

    get items(): Item[]
    {
        return this.#items;
    }

    addToCart(product: Product, quantity: number = 1)
    {
        this.#items.push({ ...product, quantity });

        this.#persist();
    }

    clear(): void
    {
        this.#items = [];

        this.#persist();
    }

    #persist(): void
    {
        sessionStorage.setItem('cart', JSON.stringify(this.items));
    }
}
