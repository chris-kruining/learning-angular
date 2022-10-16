import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './product/list/list.component';
import { DetailComponent } from './product/detail/detail.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'product/:id', component: DetailComponent },
    { path: 'cart', component: CartComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule
{
}
