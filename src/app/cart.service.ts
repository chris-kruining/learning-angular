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

    add(product: Product, quantity: number = 1)
    {
        const existing = this.#items.find(p => p.id === product.id);

        if (existing === undefined)
        {
            this.#items.push({ ...product, quantity });
        }
        else
        {
            existing.quantity += quantity;
        }

        this.#persist();
    }

    remove(id: Product['id']): void
    {
        this.#items = this.#items.filter(p => p.id !== id);

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
