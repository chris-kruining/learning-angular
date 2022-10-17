import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { DetailComponent } from './product/detail/detail.component';
import { ListComponent } from './product/list/list.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { AlertComponent } from './product/alert/alert.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule,
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
