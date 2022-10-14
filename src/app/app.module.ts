import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { DetailComponent } from './product/detail/detail.component';
import { ListComponent } from './product/list/list.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { AlertComponent } from './product/alert/alert.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot([
            { path: '', component: ListComponent },
            { path: 'product/:id', component: DetailComponent },
            { path: 'cart', component: CartComponent },
        ]),
    ],
    declarations: [
        AppComponent,
        CartComponent,
        DetailComponent,
        ListComponent,
        NavigationComponent,
        AlertComponent,
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule
{
}
