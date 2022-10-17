import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../product.service';

@Component({
    selector: 'app-product-alert',
    templateUrl: './alert.component.html',
    styleUrls: [ './alert.component.css' ],
})
export class AlertComponent
{
    @Input() product: Product|undefined;
    @Output() notify: EventEmitter<Product> = new EventEmitter<Product>();
}
