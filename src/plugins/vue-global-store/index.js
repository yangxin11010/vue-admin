import { inject, watch, reactive } from "vue";

const defaultKey = Symbol("vue-global-data");

function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}

function isString(value) {
    return Object.prototype.toString.call(value) === "[object String]";
}

function isFunction(value) {
    return Object.prototype.toString.call(value) === "[object Function]";
}

function getSymbolName(value) {
    if (isString(value)) return "vue-global-" + value;
    const val = value.toString().match(/\(([^)]*)\)/);
    return val[1].includes("vue-global-") ? val[1] : "vue-global-" + val[1];
}

/**
 * GlobalState
 * @param {*} options { stroage, name, behavior }
 */
export class GlobalState {
    constructor(options) {
        let { state, behavior = {} } = options;
        const { stroage = window.localStorage, name = defaultKey } = options;
        if (!isObject(behavior)) behavior = {};
        if (isFunction(state)) state = state && state();
        this.state = reactive(JSON.parse(stroage.getItem(getSymbolName(name))) || (isObject(state) ? state : {}));

        watch(
            () => this.state,
            (value) => {
                stroage.setItem(getSymbolName(name), JSON.stringify(value));
            },
            {
                deep: true,
            }
        );

        this.commit = function(key, value) {
            if (!isString(key)) return;
            behavior[key].call(this, this.state, value);
        };
        this.install = function(app, injectKey) {
            app.provide(injectKey || name, this);
            app.config.globalProperties.$gStore = this;
        };
    }
}

/**
 * createGlobal
 * @param {*} options { stroage, name, behavior }
 */
function createGlobal(options) {
    return new GlobalState(options);
}

/**
 *
 * @param {*} key  key must to be equal to the name of createGlobal or GlobalState
 * @returns
 */
function useGlobal(key) {
    return inject(key || defaultKey);
}

export { GlobalState as default, createGlobal, useGlobal };
