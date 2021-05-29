// vuex.d.ts
import type { ComponentCustomProperties } from "vue";
import type { Store } from "vuex";
import type { State } from "@/store"


declare module "@vue/runtime-core" {
    // declare your own store states -> State
    // import type { State } from "@/store"

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
