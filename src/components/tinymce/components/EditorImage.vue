<template>
    <div class="upload-container">
        <el-button
            :style="{ background: color, borderColor: color }"
            icon="el-icon-upload"
            size="mini"
            type="primary"
            @click="dialogVisible = true"
        >
            {{ $t("tinymce.upimg.t-title") }}
        </el-button>
        <el-dialog v-model="dialogVisible">
            <el-upload
                class="editor-slide-upload"
                ref="uploadRef"
                :multiple="true"
                :file-list="fileList"
                :show-file-list="true"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
                :action="actions"
                :drag="true"
                list-type="picture-card"
                accept=".jpg,.png,.jpeg,.webp,.gif,.JPG,.PNG,.JPEG,.WEBP"
            >
                <el-button size="small" type="primary">{{ $t("tinymce.upimg.clickUpload") }}</el-button>
            </el-upload>
            <el-button @click="dialogVisible = false">{{ $t("tinymce.upimg.cancel") }}</el-button>
            <el-button type="primary" @click="handleSubmit">{{ $t("tinymce.upimg.upload") }}</el-button>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { errorMessage } from "@/util/message";
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: "EditorSlideUpload",
    props: {
        color: {
            type: String,
            default: "#1890ff",
        },
        actions: {
            type: String,
            required: true,
        },
    },
    setup(props, ctx) {
        const { t: $t } = useI18n();

        const uploadRef = ref();

        const state = reactive<{
            dialogVisible: boolean;
            listObj: { [key: string]: any };
            fileList: [];
        }>({
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
                errorMessage($t("tinymce.upimg.errMsg"));
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
    ::v-deep {
        .el-upload-dragger,
        .el-upload--picture-card {
            width: 100%;
            height: 100%;
        }
        .el-upload-dragger, .el-upload-dragger:hover {
            border: 1px dashed transparent;
        }
    }
}
</style>
