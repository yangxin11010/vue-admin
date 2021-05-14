<template>
    <div class="projectPercent">
        <template v-for="(item, index) in data" :key="index">
            <div class="item">
                <p>{{ item.title }}</p>
                <el-progress :percentage="item.num" :status="item.status ? item.status : ''"></el-progress>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { ProjectPercent } from '@model/views';

export default defineComponent({
    name: "ProjectPercent",
    props: {
        data: {
            type: Array as PropType<Array<ProjectPercent>>,
            default: () => [],
        },
    },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped>
.projectPercent {
    width: 100%;
    height: 100%;
    .item {
        margin-bottom: 5px;
        & > p {
            margin-bottom: 5px;
        }
    }
}
</style>
