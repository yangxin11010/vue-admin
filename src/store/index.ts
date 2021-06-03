// store.ts
import { createStore, Store, useStore as baseUseStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import type { InjectionKey } from "vue";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import user, { UserState } from "./module/user";
import setting, { SettingState } from "./module/setting";
import tabs, { TabsState } from "./module/tabs";

// interface/type
export const key: InjectionKey<Store<RootState>> = Symbol();

export interface RootState {
    [key: string]: any;
    user?: UserState;
    setting?: SettingState;
    tabs?: TabsState;
}

export type LayoutSize = "default" | "medium" | "small" | "mini";

export type NavType = "side" | "top";

const store = createStore<RootState>({
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
            reducer(state) {
                return {
                    setting: {
                        openLogo: state.setting?.openLogo,
                        openTabs: state.setting?.openTabs,
                        uniqueOpened: state.setting?.uniqueOpened,
                        headerMenu: state.setting?.headerMenu,
                        asideFixed: state.setting?.asideFixed,
                        isHandleAsideFixed: state.setting?.isHandleAsideFixed,
                        navType: state.setting?.navType
                    }
                };
            },
        }),
    ],
    getters,
    mutations,
    actions,
    modules: {
        user,
        setting,
        tabs
    },
});

export default store;

// define your own `useStore` composition function
export function useStore() {
    return baseUseStore(key);
}

export function useState(key?: string){
    return key ? useStore().state[key] : useStore().state;
}

export function useGetter(key?: string){
    return key ? useStore().getters[key] : useStore().getters;
}

export function useMutations(key: string, value?: any){
    return useStore().commit(key, value);
}

export function useAactions(key: string, value?: any){
    return useStore().dispatch(key, value);
}