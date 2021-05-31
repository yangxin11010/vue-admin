import { App } from "vue";

import VPromise from "./components/Promise.vue";
import VThen from "./components/Then.vue";
import VCatch from "./components/Catch.vue";
import VDataList from "./components/DataList.vue";

export { VPromise as Promise };
export { VThen as Then };
export { VCatch as Catch };
export { VDataList as DataList };

export default {
    install: (app: App) => {
        app.component("Promise", VPromise);
        app.component("Then", VThen);
        app.component("Catch", VCatch);
        app.component("DataList", VDataList);
    },
};
