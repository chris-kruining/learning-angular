import { Directive, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[mediaQuery]',
    inputs: [ 'mediaQuery' ],
})
export class MediaQueryDirective implements OnDestroy
{
    #lastState: boolean = false;
    #mediaQueryList?: MediaQueryList;

    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<Object>,
    )
    {
    }

    set mediaQuery(query: string)
    {
        if (this.#mediaQueryList !== undefined)
        {
            this.ngOnDestroy();
        }

        this.#mediaQueryList = window?.matchMedia(query);
        this.#mediaQueryList.addEventListener('change', this.#onChange);
    }

    public ngOnDestroy(): void
    {
        this.#mediaQueryList?.removeEventListener('change', this.#onChange);
        this.#mediaQueryList = undefined;
    }

    #onChange(e: MediaQueryListEvent): void
    {
        if (e.matches === true && this.#lastState === false)
        {
            this.#lastState = true;
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else if (e.matches === false && this.#lastState === true)
        {
            this.#lastState = false;
            this.viewContainer.clear();
        }
    }
}
