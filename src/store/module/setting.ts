import type { Module } from "vuex";
import type { RootState, LayoutSize, NavType } from "../index";
import { setting as gSetting } from "@/config";

export interface SettingState {
    [key: string]: any;
    lang: string;
    collapse: boolean;
    layoutSize: LayoutSize;
    openLogo: boolean;
    openTabs: boolean;
    uniqueOpened: boolean;
    headerMenu: boolean;
    asideFixed: boolean;
    navType: NavType;
    isHandleAsideFixed: false;
}

interface SetKeyValue<T = any> {
    key: string,
    value: T
}

const setting: Module<SettingState, RootState> = {
    namespaced: true,
    state: {
        lang: "zh-cn",                  // 语言
        collapse: true,                 // 折叠 menu
        layoutSize: "small",            // 全局 element-plus size
        openLogo: gSetting.openLogo,    // 标题 logo
        openTabs: gSetting.openTabs,    // tabs
        uniqueOpened: true,             // 是否保持一个子菜单的展开
        headerMenu: false,              // 头部 menu
        asideFixed: false,              // 固定 aside
        isHandleAsideFixed: false,      // 是否 用户手动点击固定 aside
        navType: "side",                // 布局方式
    },
    getters: {
        lang: state => state.lang,
        collapse: state => state.collapse,
        layoutSize: state => state.layoutSize,
        openLogo: state => state.openLogo,
        openTabs: state => state.openTabs,
        uniqueOpened: state => state.uniqueOpened,
        headerMenu: state => state.headerMenu,
        asideFixed: state => state.asideFixed,
        isHandleAsideFixed: state => state.isHandleAsideFixed,
        navType: state => state.navType,
    },
    mutations: {
        SET_LANG(state, value: string) {
            state.lang = value;
        },
        SET_COLLAPSE(state, value: boolean) {
            state.collapse = value;
        },
        SET_LAYOUTSIZE(state, value: LayoutSize) {
            state.layoutSize = value;
        },
        SET_SETTING(state, { key, value }: SetKeyValue){
            state[key] = value
        }
    },
    actions: {
        SET_LANG({ commit }, value: string) {
            commit("SET_LANG", value);
        },
        SET_COLLAPSE({ commit }, value: boolean) {
            commit("SET_COLLAPSE", value);
        },
        SET_LAYOUTSIZE({ commit }, value: LayoutSize) {
            commit("SET_LAYOUTSIZE", value);
        },
        SET_SETTING({ commit }, value: SetKeyValue){
            commit("SET_SETTING", value);
        }
    },
};

export default setting;
