import { Injectable } from '@angular/core';
import observe, { IObservable } from '../observable';
import { Product } from './product.service';

export interface Item extends Product
{
    quantity: number;
}

interface Model
{
    items: Item[];
}

@Injectable({
    providedIn: 'root',
})
export class CartService
{
    readonly #model: Model;

    constructor()
    {
        const observer = observe<Model>(JSON.parse(sessionStorage.getItem('cart') ?? '{ "items": [] }'));
        observer.addEventListener('changed', e => {
            sessionStorage.setItem('cart', JSON.stringify(this.#model));
        });

        this.#model = observer.get();
    }

    get items(): Item[]
    {
        return this.#model.items;
    }

    add(product: Product, quantity: number = 1)
    {
        const existing = this.#model.items.find(p => p.id === product.id);

        if (existing === undefined)
        {
            this.#model.items.push({ ...product, quantity });
        }
        else
        {
            existing.quantity += quantity;
        }
    }

    remove(id: Product['id']): void
    {
        this.#model.items = this.#model.items.filter(p => p.id !== id);
    }

    clear(): void
    {
        this.#model.items = [];
    }
}
