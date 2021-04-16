<template>
    <div class="clipboard">
        <el-tabs>
            <el-tab-pane label="use clipboard by function">
                <el-input class="input-box" v-model="text"></el-input>
                <el-button type="primary" @click="copyInput">copy</el-button>
            </el-tab-pane>
            <el-tab-pane label="use clipboard by v-directive">
                <el-input class="input-box" v-model="text"></el-input>
                <el-button
                    type="primary"
                    v-clipboard="text"
                    v-clipboard:success="copySuccess"
                    v-clipboard:error="copyError"
                >
                    copy
                </el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { copyText } from "@/util/clipboard";

export default defineComponent({
    name: "Clipboard",
    setup() {
        const text = ref("https://gitee.com/yangxin11010/vue-admin");
        const copyInput = () => {
            copyText(text.value)
                .then((res) => {
                    console.log(res);
                })
                .catch((e) => {
                    console.error(e);
                });
        };
        const copySuccess = (e: any) => {
            console.log(e);
        };
        const copyError = (e: any) => {
            console.error(e);
        };
        return {
            text,
            copyInput,
            copySuccess,
            copyError,
        };
    },
});
</script>

<style lang="scss" scoped>
.input-box {
    width: 350px;
}
</style>
