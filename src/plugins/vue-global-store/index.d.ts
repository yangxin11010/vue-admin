import { App, InjectionKey } from "vue";

declare const defaultKey: InjectionKey<any>;

declare interface StorageApi {
    getItem: (key: string) => any;
    setItem: (key: string, value: any) => void;
    removeItem: (key: string) => void;
}

export declare interface BehaviorOptions<S> {
    [key: string]: (state: S, payload: any) => void;
}

export declare interface GlobalStateOptions<S> {
    name?: InjectionKey<GlobalState<S>> | string;
    state: S | (() => S);
    behavior?: BehaviorOptions<S>;
    stroage?: StorageApi;
}

export declare class GlobalState<S = any> {
    constructor(options: GlobalStateOptions<S>);
    readonly state: S;
    commit(key: string, payload: any): void;
    install(app: App, injectKey?: InjectionKey<GlobalState<S>>): void;
}

export declare function createGlobal<S = any>(options: GlobalStateOptions<S>): GlobalState<S>;

export declare function useGlobal<S = any>(injectKey?: InjectionKey<Store<S>> | string): GlobalState<S>;

export default GlobalState;
