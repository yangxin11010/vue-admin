<template>
    <div class="clipboard">
        <el-tabs>
            <el-tab-pane label="use clipboard by function">
                <el-row :gutter="10">
                    <el-col class="mb10" :span="8" :xs="24">
                        <el-input v-model="text"></el-input>
                    </el-col>
                    <el-col class="mb10" :span="16" :xs="24">
                        <el-button type="primary" icon="np-icon-fuzhi" @click="copyInput">copy</el-button>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="use clipboard by v-directive">
                <el-row :gutter="10">
                    <el-col class="mb10" :span="8" :xs="24">
                        <el-input v-model="text"></el-input>
                    </el-col>
                    <el-col class="mb10" :span="16" :xs="24">
                        <el-button
                            type="primary"
                            v-clipboard="text"
                            v-clipboard:success="copySuccess"
                            v-clipboard:error="copyError"
                            icon="np-icon-fuzhi"
                        >
                            copy
                        </el-button>
                    </el-col>
                </el-row>
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

<style lang="scss" scoped></style>
