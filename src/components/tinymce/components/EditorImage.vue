<template>
    <div class="upload-container">
        <el-button
            :style="{ background: color, borderColor: color }"
            icon="el-icon-upload"
            size="mini"
            type="primary"
            @click="dialogVisible = true"
        >
            上传图片
        </el-button>
        <el-dialog v-model="dialogVisible">
            <el-upload
                ref="uploadRef"
                :multiple="true"
                :file-list="fileList"
                :show-file-list="true"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
                class="editor-slide-upload"
                action="https://httpbin.org/post"
                list-type="picture-card"
            >
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">上传</el-button>
        </el-dialog>
    </div>
</template>

<script lang="ts">
// import { getToken } from 'api/qiniu'
import { defineComponent, reactive, toRefs, ref } from "vue";
import { errorMessage } from "@/util/message";

interface CustomData {
    [key: string]: any;
}

interface State {
    dialogVisible: boolean;
    listObj: CustomData;
    fileList: [];
}

export default defineComponent({
    name: "EditorSlideUpload",
    props: {
        color: {
            type: String,
            default: "#1890ff",
        },
    },
    setup(props, ctx) {
        const uploadRef = ref();

        const state = reactive<State>({
            dialogVisible: false,
            listObj: {},
            fileList: [],
        });

        const checkAllSuccess = () => {
            return Object.keys(state.listObj).every((item: any) => state.listObj[item].hasSuccess);
        };

        const handleSubmit = () => {
            const arr = Object.keys(state.listObj).map((v) => state.listObj[v]);
            if (!checkAllSuccess()) {
                errorMessage(
                    "Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!"
                );
                return;
            }
            ctx.emit("successCBK", arr);
            state.listObj = {};
            state.fileList = [];
            state.dialogVisible = false;
            uploadRef.value.clearFiles();
        };

        const handleSuccess = (response: any, file: any) => {
            const uid = file.uid;
            const objKeyArr = Object.keys(state.listObj);
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (state.listObj[objKeyArr[i]].uid === uid) {
                    state.listObj[objKeyArr[i]].url = response.files.file;
                    state.listObj[objKeyArr[i]].hasSuccess = true;
                    return;
                }
            }
        };
        const handleRemove = (file: any) => {
            const uid = file.uid;
            const objKeyArr = Object.keys(state.listObj);
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (state.listObj[objKeyArr[i]].uid === uid) {
                    delete state.listObj[objKeyArr[i]];
                    return;
                }
            }
        };
        const beforeUpload = (file: any) => {
            const _URL = window.URL || window.webkitURL;
            const fileName = file.uid;
            state.listObj[fileName] = {};
            return new Promise((resolve) => {
                const img = new Image();
                img.src = _URL.createObjectURL(file);
                img.onload = function() {
                    state.listObj[fileName] = {
                        hasSuccess: false,
                        uid: file.uid,
                        // width: this.width,
                        // height: this.height,
                    };
                };
                resolve(true);
            });
        };

        return {
            uploadRef,
            ...toRefs(state),
            checkAllSuccess,
            handleSubmit,
            handleSuccess,
            handleRemove,
            beforeUpload,
        };
    },
});
</script>

<style lang="scss" scoped>
.editor-slide-upload {
    margin-bottom: 20px;
    ::v-deep .el-upload--picture-card {
        width: 100%;
    }
}
</style>
