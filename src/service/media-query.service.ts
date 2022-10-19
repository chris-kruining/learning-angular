import { Inject, Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class MediaQueryService implements OnDestroy
{
    #matches: boolean = true;
    #mediaQueryList?: MediaQueryList;
    readonly #onChange = (e: MediaQueryListEvent): void => {
        this.#matches = e.matches;
    };

    constructor(@Inject('mediaQuery') query: string = '')
    {
        this.query = query;
    }

    get matches()
    {
        return this.#matches;
    }

    set query(value: string)
    {
        if (this.#mediaQueryList !== undefined)
        {
            this.ngOnDestroy();
        }

        this.#mediaQueryList = window?.matchMedia(value);
        this.#mediaQueryList.addEventListener('change', this.#onChange);

        this.#onChange(new MediaQueryListEvent('change', this.#mediaQueryList));
    }

    public ngOnDestroy(): void
    {
        this.#mediaQueryList?.removeEventListener('change', this.#onChange);
        this.#mediaQueryList = undefined;
    }
}
