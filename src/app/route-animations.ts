import { animate, group, query, style, transition, trigger } from '@angular/animations';

const distance = '5em';
export const fader = trigger('routeAnimations', [
    transition('* <=> *', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                insetBlockStart: 0,
                insetInlineStart: 0,
                inlineSize: '100%',
            }),
        ], { optional: true, }),
        query(':enter', [
            style({
                opacity: 0,
                translate: `${distance} 0`,
            }),
        ], { optional: true, }),
        query(':leave', [
            style({
                opacity: 1,
                translate: '0 0',
            }),
        ], { optional: true, }),
        group([
            query(':leave', [
                animate('.3s ease-in-out', style({ opacity: 0, translate: `-${distance} 0` }))
            ], { optional: true, }),
            query(':enter', [
                animate('.3s ease-in-out', style({ opacity: 1, translate: '0 0' }))
            ], { optional: true, }),
        ]),
    ]),
]);