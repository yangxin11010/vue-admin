<template>
    <my-drawer v-if="setting.showSetting" :before-close="beforeClose">
        <div class="setting">
            <p class="title">{{ $t("system.title") }}</p>
            <div class="set-item">
                <div>{{ $t("system.sidebarLogo") }}</div>
                <el-switch
                    :value="openLogo"
                    active-color="#1890ff"
                    inactive-color="#dcdfe6"
                    @change="switchChange($event, 0)"
                ></el-switch>
            </div>
            <div class="set-item">
                <div>{{ $t("system.tagsView") }}</div>
                <el-switch
                    :value="openTabs"
                    active-color="#1890ff"
                    inactive-color="#dcdfe6"
                    @change="switchChange($event, 1)"
                ></el-switch>
            </div>
        </div>
    </my-drawer>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import MyDrawer from "@/components/MyDrawer.vue";
import { useStore } from "@/store";
import { setting } from "@/config";

export default defineComponent({
    setup() {
        const store = useStore();
        let openLogo = computed(() => store.getters.openLogo);
        let openTabs = computed(() => store.getters.openTabs);

        const switchChange = (e: boolean, index: number) => {
            if (index === 0) {
                store.dispatch("CHANGE_LOGO", e);
            } else if (index === 1) {
                store.dispatch("CHANGE_Tabs", e);
            }
        };

        // my-drawer 关闭前 回调
        const beforeClose = (done: () => void) => {
            console.warn("my-drawer is colsed");
            done();
        };
        return {
            beforeClose,
            openLogo,
            openTabs,
            switchChange,
            setting
        };
    },
    components: {
        MyDrawer,
    },
});
</script>

<style lang="scss" scoped>
.setting {
    padding: 30px 20px 20px;
    font-size: 14px;
}
.title {
    font-weight: bold;
    margin-bottom: 20px;
}
.set-item {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.65);
}
</style>
