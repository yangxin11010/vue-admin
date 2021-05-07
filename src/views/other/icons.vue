<template>
    <div class="svgpage">
        <el-tabs type="border-card" tab-position="top">
            <el-tab-pane label="Element-UI Icons">
                <el-space wrap size="large">
                    <template v-for="(item, index) in ElIcons" :key="index">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="`<i class=&quot;${item}&quot; />`"
                            placement="top"
                        >
                            <div class="icon-item" @click="copy(`<i class=&quot;${item}&quot; />`)">
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
                            placement="top"
                        >
                            <div class="icon-item" @click="copy(`<svg-icon icon-class=&quot;${item}&quot; />`)">
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
                            placement="top"
                        >
                            <div class="icon-item" @click="copy(`<i class=&quot;${item}&quot; />`)">
                                <i :class="item" />
                                <span>{{ item }}</span>
                            </div>
                        </el-tooltip>
                    </template>
                </el-space>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElIcons, SvgIcons, NpIcons } from "@/assets/js/icons";
import { copyText } from "@/util/clipboard";
export default defineComponent({
    name: "SvgPage",
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

        return {
            ElIcons,
            SvgIcons,
            NpIcons,
            copy,
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
