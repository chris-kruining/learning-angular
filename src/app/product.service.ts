import { Injectable } from '@angular/core';

interface Rating
{
    rate: number;
    count: number;
}

export interface Product
{
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

@Injectable({
    providedIn: 'root',
})
export class ProductService
{
    #products: Promise<Product[]> = fetch('https://fakestoreapi.com/products').then(r => r.json());

    get products(): Promise<Product[]>
    {
        return this.#products;
    }
}
