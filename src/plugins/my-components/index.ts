import { App } from "vue";
import MyTable from "./components/MyTable.vue";
import HandleBox from "./components/HandleBox.vue";
import FlexBox from "./components/FlexBox.vue";
import MyPagination from "./components/MyPagination.vue";
import MyDialog from "./components/MyDialog.vue";
import MyDrawer from "./components/MyDrawer.vue";

export { MyTable, HandleBox, FlexBox, MyPagination, MyDialog, MyDrawer };

export default {
    install: (app: App) => {
        app.component("MyTable", MyTable);
        app.component("HandleBox", HandleBox);
        app.component("FlexBox", FlexBox);
        app.component("MyPagination", MyPagination);
        app.component("MyDialog", MyDialog);
        app.component("MyDrawer", MyDrawer);
    },
};
