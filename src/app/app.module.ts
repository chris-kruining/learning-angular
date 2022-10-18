import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MediaQueryDirective } from '../directive/media-query.directive';
import { MediaQueryService } from '../service/media-query.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppServerModule } from './app.server.module';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { AlertComponent } from './product/alert/alert.component';
import { DetailComponent } from './product/detail/detail.component';
import { ListComponent } from './product/list/list.component';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        RouterModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
    declarations: [
        AppComponent,
        CartComponent,
        DetailComponent,
        ListComponent,
        NavigationComponent,
        AlertComponent,
        HomeComponent,
        MediaQueryDirective,
        PageNotFoundComponent,
    ],
    providers: [
        MediaQueryService,
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule
{
}
