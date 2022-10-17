import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-layout-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: [ '../../../styles.css', './navigation.component.css' ],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class NavigationComponent implements OnInit
{
    public faShoppingCart = faShoppingCart;

    constructor()
    {
    }

    ngOnInit(): void
    {
    }

}
