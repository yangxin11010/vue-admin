import { App, inject, watch, reactive, InjectionKey } from "vue";

export interface StorageApi {
    getItem: (key: string) => any;
    setItem: (key: string, value: any) => void;
    removeItem: (key: string) => void;
}

export interface GlobalStateOptions<T extends object> {
    state?: T | (() => T);
    name?: string | InjectionKey<any>;
    stroage?: StorageApi;
    behavior?: BehaviorOptions<T>;
}

export interface BehaviorOptions<T = any> {
    [key: string]: (state: T, value: any) => void;
}

const defaultKey: InjectionKey<any> = Symbol("vue-global-data");

function isObject(value: any) {
    return Object.prototype.toString.call(value) === "[object Object]";
}

function isString(value: any) {
    return Object.prototype.toString.call(value) === "[object String]";
}

function isFunction(value: any) {
    return Object.prototype.toString.call(value) === "[object Function]";
}

function getSymbolName(value: InjectionKey<typeof GlobalState> | string): string {
    if (isString(value)) return value as string;
    const val = value.toString().match(/\(([^)]*)\)/);
    return (val as string[])[1];
}

/**
 * GlobalState
 * @param {*} options { stroage, name, behavior }
 */
export class GlobalState<T extends object> {
    readonly state: T;
    readonly commit: (key: string, value: any) => void;
    readonly install: (app: App, injectKey?: InjectionKey<any>) => void;

    constructor(options: GlobalStateOptions<T>) {
        let { state, behavior = {} } = options;
        const { stroage = window.localStorage, name = defaultKey } = options;
        if (!isObject(behavior)) behavior = {};
        if (isFunction(state)) state = state && (state as () => T)();
        this.state = reactive(JSON.parse(stroage.getItem(getSymbolName(name))) || (isObject(state) ? state : {}));

        watch(
            () => this.state,
            (value: T) => {
                stroage.setItem(getSymbolName(name), JSON.stringify(value));
            },
            {
                deep: true,
            }
        );

        this.commit = function(key, value) {
            if (!isString(key)) return;
            behavior[key].call(this, this.state as T, value);
        };
        this.install = function(app, injectKey) {
            console.log(injectKey || name);
            app.provide(injectKey || name, this);
            app.config.globalProperties.$gStore = this;
        };
    }
}

/**
 * createGlobal
 * @param {*} options { stroage, name, behavior }
 */
function createGlobal<T extends object>(options: GlobalStateOptions<T>) {
    return new GlobalState<T>(options);
}

/**
 *
 * @param {*} key  key must to be equal to the name of createGlobal or GlobalState
 * @returns
 */
function useGlobal<T = any>(key?: string | InjectionKey<T>): typeof GlobalState {
    return inject(key || defaultKey);
}

export { GlobalState as default, createGlobal, useGlobal };
