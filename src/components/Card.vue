<template>
    <el-card class="myElCard" :body-style="{ padding: 0 }">
        <div class="card-item">
            <div class="card-item-icon-box">
                <svg-icon v-if="svg" class="card-item-icon" :icon-class="icon"></svg-icon>
                <i v-else class="icon"></i>
            </div>
            <div class="card-item-body">
                <span>{{ title }}</span>
                <span>{{ num }}</span>
            </div>
        </div>
    </el-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Card",
    props: {
        svg: {
            type: Boolean,
            default: true,
        },
        icon: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        num: {
            type: String,
            default: "",
        },
        iconColor: {
            type: String,
            default: "",
        },
    },
    setup() {
        return {};
    },
});
</script>

<style lang="scss" scoped>
.card-item {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.card-item-icon-box {
    width: 80px;
    height: 80px;
    margin: 14px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
    background-color: #fff;
    color: v-bind(iconColor);
}
.myElCard:hover .card-item-icon-box {
    background-color: v-bind(iconColor);
    color: #fff;
}

.card-item-icon {
    width: 48px;
    height: 48px;
    margin: 16px;
}
.card-item-body {
    font-weight: bold;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-right: 20px;
    & > span {
        &:nth-child(1) {
            line-height: 18px;
            font-size: 16px;
            margin-bottom: 12px;
            color: rgba(0, 0, 0, 0.45);
        }
        &:nth-child(2) {
            font-size: 20px;
            color: #666;
        }
    }
}
</style>
