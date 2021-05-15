<template>
    <el-menu
        default-active="1"
        class="headerMenu"
        mode="horizontal"
        @select="handleSelect"
    >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
            <template #title>我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
                <template #title>选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="3">消息中心</el-menu-item>
        <el-menu-item index="4">订单管理</el-menu-item>
    </el-menu>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
    name: "HeaderMenu",
    props: {},
    setup() {
        const handleSelect = (key: string, keyPath: string[]) => {
            console.log(key, keyPath);
        };
        onMounted(() => {});

        return {
            handleSelect,
        };
    },
});
</script>

<style lang="scss" scoped></style>
