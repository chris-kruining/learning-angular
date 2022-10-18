import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailComponent } from './product/detail/detail.component';
import { ListComponent } from './product/list/list.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'product', component: ListComponent },
            { path: 'product/:id', component: DetailComponent },
            { path: 'cart', component: CartComponent },
            { path: '**', component: PageNotFoundComponent },
        ]),
    ],
    exports: [ RouterModule ],
})
export class AppRoutingModule
{
}
