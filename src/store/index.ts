// store.ts
import { createStore, Store, useStore as baseUseStore, Getter } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { InjectionKey } from 'vue'
import { Tabs } from '@/model/views';


export interface KeyValue {
	key: string;
	value: any;
}


interface State {
	[key: string]: any;
	isLogin: boolean;
	collapse: boolean;
	token: string | null;
	tabsList: Tabs[];
}

export const key: InjectionKey<Store<State>> = Symbol();


// define your own `useStore` composition function
export function useStore() {
	return baseUseStore(key)
}

const store = createStore<State>({
	plugins: [createPersistedState({
		storage: window.sessionStorage,
		reducer(state) {
			return {
				isLogin: state.isLogin,
				collapse: state.collapse,
				token: state.token,
				tabsList: state.tabsList,
			}
		}
	}),
	createPersistedState({
		storage: window.localStorage,
		reducer(state) {
			return {

			}
		}
	})],
	state: {
		isLogin: false,
		collapse: true,
		token: null,
		tabsList: [{ name: 'Dashboard', title: '首页', path: '/dashboard' }]
	},
	getters: {
		isLogin: state => state.isLogin,
		collapse: state => state.collapse,
		token: state => state.token,
		tabsList: state => state.tabsList,
	},
	mutations: {
		LOGIN(state, value: string) {
			state.isLogin = true;
			state.token = value;
		},
		LOGIN_OUT(state) {
			state.isLogin = false;
			state.token = null;
		},
		SET_COLLAPSE(state, value: boolean) {
			state.collapse = value;
		},
		ADD_TABS(state, value: Tabs) {
			state.tabsList.push(value);
		},
		REMOVE_TABS(state, value?: number) {
			state.tabsList.splice(value ? value : 1, value ? 1 : state.tabsList.length - 1);
		},
		REMOVE_OTHER_TABS(state, value: number) {
			if (value === 0) {
				state.tabsList = [state.tabsList[0]];
			} else {
				state.tabsList = [state.tabsList[0], state.tabsList[value]];
			}
		},
	},
	actions: {
		LOGIN({ commit }, value: string) {
			commit('LOGIN', value);
		},
		LOGIN_OUT({ commit }) {
			commit('LOGIN_OUT');
		},
		SET_COLLAPSE({ commit }, value: boolean) {
			commit('SET_COLLAPSE', value);
		},
		ADD_TABS({ commit }, value: Tabs) {
			commit('ADD_TABS', value);
		},
		REMOVE_TABS({ commit }, value?: number) {
			commit('REMOVE_TABS', value);
		},
		REMOVE_OTHER_TABS({ commit }, value: number) {
			commit('REMOVE_OTHER_TABS', value);
		},
	}
});

export default store;





