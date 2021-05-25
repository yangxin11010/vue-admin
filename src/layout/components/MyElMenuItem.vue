<template>
    <template v-if="item.children.length <= 0">
        <el-menu-item :index="checkLink(item.realPath) ? '' : path" @click="jumpUrl(item.realPath)">
            <i v-if="item.icon" :class="item.icon"></i>
            <template #title>
                <span>{{ path ? $t(`aside.${path}`) : "" }}</span>
            </template>
        </el-menu-item>
    </template>
    <template v-else>
        <el-submenu :index="path">
            <template #title>
                <i v-if="item.icon" :class="item.icon"></i>
                <span>{{ path ? $t(`aside.${path}`) : "" }}</span>
            </template>
            <template v-for="item2 in item.children" :key="path + item2.path">
                <my-el-menu-item :item="item2" :path="path + item2.path"></my-el-menu-item>
            </template>
        </el-submenu>
    </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { Menu } from "@/model/views";
import { checkLink } from "@/util/validata";
import { openWindow } from "@/util";
export default defineComponent({
    name: "MyElSubmenuItem",
    props: {
        item: {
            type: Object as PropType<Menu>,
            required: true
        },
        path: {
            type: String,
            required: true
        }
    },
    setup() {
        const jumpUrl = (value: string) => {
            checkLink(value) && openWindow(value);
        };
        return {
            jumpUrl,
            checkLink
        };
    },
});
</script>

<style lang="scss" scoped></style>
