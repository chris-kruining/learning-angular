import { equals, getPropertiesOf, Properties } from './functions';

export interface IObservable<T> extends EventTarget
{
    readonly parents: Set<WeakRef<EventTarget>>;
    readonly options: ObservableOptions;

    get(): T;
    set(value: T): void;

    // addEventListener(type: 'changed', listener: (event: ChangeEvent<T>) => any): void;
}

export interface ObservableOptions
{
    parent?: WeakRef<EventTarget>;
}

export interface ChangeEvent<T> extends CustomEvent<T>
{
    old: T[keyof T]|T|undefined;
    new: T[keyof T]|T;
    property?: keyof T;
    path?: string[];
    target: IObservable<T>;
}

class Observable<T> extends EventTarget implements IObservable<T>
{
    public readonly parents: Set<WeakRef<EventTarget>> = new Set;

    #value: T;
    readonly #options: ObservableOptions;
    readonly #keys: WeakMap<IObservable<T[keyof T]>, keyof T> = new WeakMap;
    readonly #observers: Map<keyof T, IObservable<T[keyof T]>> = new Map;

    constructor(value: T, options: ObservableOptions)
    {
        super();

        if(options.parent !== undefined)
        {
            this.parents.add(options.parent);
        }

        this.addEventListener('changed', e => {
            const d = e as unknown as ChangeEvent<T>;

            if(d.target === this)
            {
                return;
            }

            const property: keyof T|undefined = this.#keys.get(d.target as IObservable<T[keyof T]>);

            d.property = property;
            d.path = [ property as string, ...(d.path ?? []) ];
            d.target = this;
        });

        this.#options = options;
        this.#value = this.#prep(value);
    }

    public get(): T
    {
        return this.#value
    }

    public set(value: T): void
    {
        if (equals(this.#value, value) === true) {
            return;
        }

        this.#value = this.#prep(value);

        dispatch(this, 'changed', { detail: { old: undefined, new: this.#value, target: this, path: [] } });
    }

    public get options(): ObservableOptions
    {
        return this.#options;
    }

    #add(property: keyof T, value: T[keyof T]): IObservable<T[keyof T]>
    {
        const o = observe(value, { ...this.#options, parent: new WeakRef<EventTarget>(this) });

        this.#keys.set(o, property);
        this.#observers.set(property, o);

        return o;
    }

    #prep(value: T): T
    {
        if(value instanceof Promise)
        {
            return value.then(v => this.#prep(v)) as unknown as T;
        }

        if((value as any)?.__isProxy__ === true)
        {
            (value as any).__owner__.parents.add(new WeakRef(this));

            return value;
        }

        if(value && typeof value === 'object')
        {
            const props: Properties<T> = getPropertiesOf<T>(value);
            const entries: Array<[ keyof T&string, TypedPropertyDescriptor<T[keyof T]> ]> = Object.entries(props) as Array<[ keyof T&string, TypedPropertyDescriptor<T[keyof T]> ]>
            const keys: Array<string> = Object.keys(props);
            const changables = entries.filter(([, d]) => d.enumerable === true && d.writable === true).map(([k]) => k);
            const references = new Map;

            for(const [ k, d ] of entries)
            {
                if(k.startsWith('__'))
                {
                    continue;
                }

                if(d.get)
                {
                    d.get = d.get.bind(value);

                    for(const key of changables)
                    {
                        if(references.has(key) === false)
                        {
                            references.set(key, new Set);
                        }

                        references.get(key).add(k);
                    }
                }

                if(d.set)
                {
                    d.set = d.set.bind(value);
                    this.#add(k, d.get?.() ?? d.value!);
                }

                if(d.enumerable === true && d.writable === true)
                {
                    const v = typeof d.value === 'function' ? d.value.bind(value) : d.value;

                    (value as T)[k as keyof T] = this.#add(k, v!).get();
                    d.value = v;
                }
            }

            for(const [ k, v ] of references.entries())
            {
                this.#observers.get(k)!.addEventListener('changed', d => {
                    for(const property of v)
                    {
                        dispatch(this, 'changed', { detail: { property, target: this, path: [ property, ...((d as unknown as ChangeEvent<T>).path ?? []) ] } });
                    }
                });
            }

            // console.trace({ value, props, entries, keys, changables, references });

            type TObj = { [K in keyof T]: T[K] } & { __isProxy__: boolean, __owner__: IObservable<T> };
            return new Proxy(value as TObj, {
                get: (t: TObj, p: string|symbol) => {
                    if(p === '__isProxy__')
                    {
                        return true;
                    }

                    if(p === '__owner__')
                    {
                        return this;
                    }

                    const prop = p as keyof T;

                    // TODO(Chris Kruining)
                    //  This code has something
                    //  that recursively loops,
                    //  but I can't seem to safely
                    //  remove the observe call either,
                    //  FIX THIS ASAP
                    const descriptor = props[prop] as TypedPropertyDescriptor<T[keyof T]>;
                    if(descriptor?.get)
                    {
                        return observe(descriptor.get(), { ...this.#options, parent: new WeakRef(this) }).get();
                    }

                    return this.#observers.get(prop)?.get() ?? t[prop];
                },
                set: (t: TObj, p: string|symbol, v: any) => {
                    const prop = p as keyof T;
                    const exists = t.hasOwnProperty(prop);

                    t[prop] = v;
                    v = t[prop];

                    if(this.#observers.has(prop) === true)
                    {
                        this.#observers.get(prop)!.set(v)
                    }
                    else if(exists === false)
                    {
                        keys.push(prop as string);

                        const o = this.#add(prop, v);
                        dispatch(o, 'changed', { detail: { old: undefined, new: o.get(), target: o, path: [] } });
                    }

                    return true;
                },
                has: (t: TObj, p: string|symbol) => Array.isArray(t) ? (p in t) : keys.includes(p as string),
                deleteProperty: (t: TObj, p: string|symbol) => {
                    const prop = p as keyof T;

                    delete t[prop];

                    this.#observers.delete(prop);

                    return true;
                },
            }) as T;
        }

        return value;
    }
}

export default function observe<T>(value: T, options: Partial<ObservableOptions> = {}): IObservable<T>
{
    return new Observable(value, options)
}

export function dispatch<T>(target: EventTarget, name: string, init: CustomEventInit<T>, refs: WeakSet<EventTarget> = new WeakSet()): CustomEvent<T>
{
    const event = new CustomEvent<T>(name, { bubbles: true, composed: false, ...init });

    if(refs.has(target) === false)
    {
        target.dispatchEvent(event);

        refs.add(target);

        if(event.defaultPrevented === false && event.bubbles === true)
        {
            // @ts-ignore
            for(const parentRef of target.parents ?? [])
            {
                const parent = parentRef.deref();

                if(parent === undefined)
                {
                    // @ts-ignore
                    target.parents!.delete(parentRef);

                    continue;
                }

                dispatch(parent, name, init, refs);
            }
        }
    }

    return event;
}