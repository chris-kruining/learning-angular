import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Product } from '../../product.service';

@Component({
    selector: 'app-product-alert',
    templateUrl: './alert.component.html',
    styleUrls: [ '../../../styles.css', './alert.component.css' ],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class AlertComponent
{
    @Input() product: Product|undefined;
    @Output() notify: EventEmitter<Product> = new EventEmitter<Product>();
}
