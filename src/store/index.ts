// store.ts
import { createStore, Store, useStore as baseUseStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import type { InjectionKey } from "vue";
import user, { State as UserState } from "./module/user";
import setting, { State as SettingState } from "./module/setting";
import tabs, { State as TabsState } from "./module/tabs";


export const key: InjectionKey<Store<State>> = Symbol();

// define your own `useStore` composition function
export function useStore() {
    return baseUseStore(key);
}
export function useState(key?: string): keyof State | State{
    return key ? useStore().state[key] : useStore().state;
}
export function useGetter(key?: string): keyof State | State{
    return key ? useStore().getters[key] : useStore().getters;
}
export function useMutations(key: string, value?: any){
    return useStore().commit(key, value);
}
export function useAactions(key: string, value?: any){
    return useStore().dispatch(key, value);
}

export interface State {
    [key: string]: any;
    user?: UserState;
    setting?: SettingState;
    tabs?: TabsState;
}

const store = createStore<State>({
    strict: true,
    plugins: [
        // session 存储
        createPersistedState({
            storage: window.sessionStorage,
            reducer(state) {
                return {
                    setting: {
                        lang: state.setting?.lang,
                        collapse: state.setting?.collapse,
                        layoutSize: state.setting?.layoutSize,
                    },
                    user: {
                        isLogin:  state.user?.isLogin,
                        token: state.user?.token,
                        permissions: state.user?.permissions,
                        menuList: state.user?.menuList,
                    },
                    tabs: {
                        tabsList: state.tabs?.tabsList,
                    },
                };
            },
        }),
        // local 存储
        createPersistedState({
            storage: window.localStorage,
            reducer() {
                return {};
            },
        }),
    ],
    modules: {
        user,
        setting,
        tabs
    },
});

export default store;
