// vuex.d.ts
import type { ComponentCustomProperties } from "vue";
import type { Store } from "vuex";
import type { LayoutSize } from "@/store"


declare module "@vue/runtime-core" {
    // declare your own store states
    interface State {
        lang: string;
        isLogin: boolean;
        collapse: boolean;
        token: string | null;
        tabsList: [Tabs[], Tabs[]];
        permissions: string[];
        layoutSize: LayoutSize;
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
