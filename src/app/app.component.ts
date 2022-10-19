import { Component, ViewEncapsulation } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { fader } from './route-animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ '../styles.css', './app.component.css' ],
    animations: [
        fader,
    ],
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent
{
    title = 'learning-angular';

    constructor(
        private contexts: ChildrenOutletContexts,
    ) {}

    prepareRoute()
    {
        return this.contexts.getContext('primary')?.route?.snapshot.url;
    }
}
