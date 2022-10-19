import { animate, group, query, style, transition, trigger } from '@angular/animations';

type Direction = 'blockStart'|'blockEnd'|'inlineStart'|'inlineEnd';

export function slideTo(direction: Direction)
{
    const prop = `inset${direction.charAt(0).toUpperCase()}${direction.slice(1)}`;

    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                insetBlockStart: 0,
                // insetInlineStart: 0,
                [prop]: 0,
            })
        ], { optional: true }),
        query(':enter', [
            style({ [prop]: '-50em', opacity: '0' }),
        ], { optional: true }),
        group([
            query(':leave', [
                animate('.3s ease-in-out', style({ [prop]: '50em', opacity: '0' }))
            ], { optional: true }),
            query(':enter', [
                animate('.3s ease-in-out', style({ [prop]: '0', opacity: '1' }))
            ], { optional: true }),
        ]),
    ];
}

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
                translate: '20em 0',
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
                animate('.6s ease-in-out', style({ opacity: 0, translate: '-20em 0' }))
            ], { optional: true, }),
            query(':enter', [
                animate('.6s ease-in-out', style({ opacity: 1, translate: '0 0' }))
            ], { optional: true, }),
        ]),
    ]),
]);