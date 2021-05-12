<template>
    <div class="svgpage">
        <el-tabs type="border-card" tab-position="top" :before-leave="beforeLeave">
            <el-tab-pane label="Element-UI Icons">
                <el-space wrap size="large">
                    <template v-for="(item, index) in ElIcons" :key="index">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="`<i class=&quot;${item}&quot; />`"
                            :placement="index < ElIcons.length / 2 ? 'bottom' : 'top'"
                        >
                            <div class="icon-item" @click="copy(copyType ? item : `<i class=&quot;${item}&quot; />`)">
                                <i :class="item" />
                                <span>{{ item }}</span>
                            </div>
                        </el-tooltip>
                    </template>
                </el-space>
            </el-tab-pane>
            <el-tab-pane label="Svg-Icons">
                <el-space wrap size="large">
                    <template v-for="(item, index) in SvgIcons" :key="index">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="`<svg-icon icon-class=&quot;${item}&quot; />`"
                            :placement="index < SvgIcons.length / 2 ? 'bottom' : 'top'"
                        >
                            <div
                                class="icon-item"
                                @click="copy(copyType ? item : `<svg-icon icon-class=&quot;${item}&quot; />`)"
                            >
                                <i><svg-icon :icon-class="item"></svg-icon></i>
                                <span>{{ item }}</span>
                            </div>
                        </el-tooltip>
                    </template>
                </el-space>
            </el-tab-pane>
            <el-tab-pane label="Np-Icons">
                <el-space wrap size="large">
                    <template v-for="(item, index) in NpIcons" :key="index">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="`<i class=&quot;${item}&quot; />`"
                            :placement="index < NpIcons.length / 2 ? 'bottom' : 'top'"
                        >
                            <div class="icon-item" @click="copy(copyType ? item : `<i class=&quot;${item}&quot; />`)">
                                <i :class="item" />
                                <span>{{ item }}</span>
                            </div>
                        </el-tooltip>
                    </template>
                </el-space>
            </el-tab-pane>
            <el-tab-pane label="switch">
                <template #label>
                    <div style="width: 100%;background: #FFF;padding: 0 20px;">
                        <el-switch
                            v-model="copyType"
                            active-text="Copy ClassName"
                            inactive-text="Copy HtmlLabel"
                        ></el-switch>
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElIcons, SvgIcons, NpIcons } from "@/assets/js/icons";
import { copyText } from "@/util/clipboard";
export default defineComponent({
    name: "IconsPage",
    setup() {
        const copy = (val: string) => {
            copyText(val)
                .then((e) => {
                    console.log(e);
                })
                .catch((e) => {
                    console.error(e);
                });
        };

        const copyType = ref(false);

        const beforeLeave = (activeName: string) => {
            if (activeName === "3") return false;
        };

        return {
            ElIcons,
            SvgIcons,
            NpIcons,
            copy,
            beforeLeave,
            copyType,
        };
    },
});
</script>

<style lang="scss" scoped>
.icon-item {
    width: 120px;
    height: 120px;
    text-align: center;
    // margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        color: #1890ff;
    }
    i {
        font-size: 35px;
    }
    span {
        font-size: 14px !important;
        margin-top: 10px;
    }
}
</style>
