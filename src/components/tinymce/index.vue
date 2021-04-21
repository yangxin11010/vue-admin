<template>
    <div :class="{ fullscreen: fullscreen }" class="tinymce-container" :style="{ width: containerWidth }">
        <textarea :id="tinymceId" class="tinymce-textarea" />
        <div class="editor-custom-btn-container">
            <editor-image :actions="actions" color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    defineAsyncComponent,
    onMounted,
    onUnmounted,
    reactive,
    toRefs,
    PropType,
    computed,
    watch,
    nextTick,
    onActivated,
    onDeactivated,
} from "vue";
import plugins from "./plugins";
import toolbar from "./toolbar";
import load from "./dynamicLoadScript";
// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
// const tinymceCDN = "http://chky.js.zhuanfa666.com/chky/tinymce/tinymce.min.js";
const tinymceCDN = "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";
import { errorMessage } from "@/util/message";
import { useStore } from "@/store";

export default defineComponent({
    name: "Tinymce",
    props: {
        id: {
            type: String,
            default: () => {
                return "vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + "");
            },
        },
        modelValue: {
            type: String,
            default: "",
        },
        childHasChange: {
            type: Boolean,
            default: false,
        },
        toolbar: {
            type: Array as PropType<string[]>,
            default: () => {
                return [];
            },
        },
        menubar: {
            type: String,
            default: "file edit insert view format table",
        },
        height: {
            type: [Number, String],
            default: 360,
        },
        width: {
            type: [Number, String],
            default: "auto",
        },
        // 图片上传地址
        actions: {
            type: String,
            default: "https://httpbin.org/post",
        },
    },
    setup(props, ctx) {
        const store = useStore();
        const state = reactive<{
            hasChange: boolean;
            hasInit: boolean;
            tinymceId: string;
            fullscreen: boolean;
            languageTypeList: { [key: string]: string };
        }>({
            hasChange: props.childHasChange,
            hasInit: false,
            tinymceId: props.id,
            fullscreen: false,
            languageTypeList: {
                en: "en",
                "zh-cn": "zh_CN",
                es: "es_MX",
                ja: "ja",
            },
        });

        let _window: any = window;

        const containerWidth = computed(() => {
            const width = props.width as string;
            if (/^[\d]+(\.[\d]+)?$/.test(width)) {
                // matches `100`, `'100'`
                return `${width}px`;
            }
            return width;
        });

        watch(
            () => store.getters.lang,
            () => {
                destroyTinymce();
                init();
            }
        );

        watch(
            () => props.modelValue,
            (val) => {
                if (!state.hasChange && state.hasInit) {
                    nextTick(() => {
                        _window.tinymce.get(state.tinymceId).setContent(val || "");
                    });
                }
            }
        );

        watch(
            () => props.childHasChange,
            (val) => {
                state.hasChange = val;
                if (!state.hasChange && state.hasInit) {
                    nextTick(() => {
                        _window.tinymce.get(state.tinymceId).setContent(props.modelValue || "");
                    });
                }
            }
        );

        const init = () => {
            load(tinymceCDN, (err: any) => {
                if (err) {
                    errorMessage(err.message);
                    return;
                }
                initTinymce();
            });
        };

        const destroyTinymce = () => {
            const tinymce = _window.tinymce.get(state.tinymceId);
            state.fullscreen && tinymce.execCommand("mceFullScreen");
            tinymce && tinymce.destroy();
        };

        const setContent = (value: any) => {
            _window.tinymce.get(state.tinymceId).setContent(value);
        };

        const getContent = () => {
            _window.tinymce.get(state.tinymceId).getContent();
        };

        const imageSuccessCBK = (arr: any) => {
            arr.forEach((v: any) =>
                _window.tinymce.get(state.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
            );
        };

        const initTinymce = () => {
            _window.tinymce.init({
                selector: `#${state.tinymceId}`,
                language: state.languageTypeList[store.getters.lang],
                height: props.height,
                body_class: "panel-body ",
                object_resizing: false,
                toolbar: props.toolbar.length > 0 ? props.toolbar : toolbar,
                menubar: props.menubar,
                plugins: plugins,
                end_container_on_empty_block: true,
                fontsize_formats: "8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 24pt 36pt",
                powerpaste_word_import: "clean",
                code_dialog_height: 450,
                code_dialog_width: 1000,
                advlist_bullet_styles: "square",
                advlist_number_styles: "default",
                imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
                default_link_target: "_blank",
                link_title: false,
                nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
                init_instance_callback: (editor: any) => {
                    if (props.modelValue) {
                        editor.setContent(props.modelValue);
                    }
                    state.hasInit = true;
                    editor.on("NodeChange Change KeyUp SetContent", () => {
                        state.hasChange = true;
                        ctx.emit("update:modelValue", editor.getContent());
                    });
                },
                setup(editor: any) {
                    editor.on("FullscreenStateChanged", (e: any) => {
                        state.fullscreen = e.state;
                    });
                },
                // it will try to keep these URLs intact
                // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
                // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
                convert_urls: false,
                // 整合七牛上传
                // images_dataimg_filter(img) {
                //   setTimeout(() => {
                //     const $image = $(img);
                //     $image.removeAttr('width');
                //     $image.removeAttr('height');
                //     if ($image[0].height && $image[0].width) {
                //       $image.attr('data-wscntype', 'image');
                //       $image.attr('data-wscnh', $image[0].height);
                //       $image.attr('data-wscnw', $image[0].width);
                //       $image.addClass('wscnph');
                //     }
                //   }, 0);
                //   return img
                // },
                // images_upload_handler(blobInfo, success, failure, progress) {
                //   progress(0);
                //   const token = _this.$store.getters.token;
                //   getToken(token).then(response => {
                //     const url = response.data.qiniu_url;
                //     const formData = new FormData();
                //     formData.append('token', response.data.qiniu_token);
                //     formData.append('key', response.data.qiniu_key);
                //     formData.append('file', blobInfo.blob(), url);
                //     upload(formData).then(() => {
                //       success(url);
                //       progress(100);
                //     })
                //   }).catch(err => {
                //     failure('出现未知问题，刷新页面，或者联系程序员')
                //     console.log(err);
                //   });
                // },
            });
        };

        onMounted(() => {
            init();
        });

        onActivated(() => {
            init();
        });
        onDeactivated(() => {
            destroyTinymce();
        });

        onUnmounted(() => {
            destroyTinymce();
        });
        return {
            ...toRefs(state),
            containerWidth,
            setContent,
            getContent,
            imageSuccessCBK,
        };
    },
    components: {
        editorImage: defineAsyncComponent(() => import("./components/EditorImage.vue")),
    },
});
</script>

<style lang="scss" scoped>
.tinymce-container {
    position: relative;
    line-height: normal;
}

.tinymce-container {
    /deep/ {
        .mce-fullscreen {
            z-index: 10000;
        }
    }
}

.tinymce-textarea {
    visibility: hidden;
    z-index: -1;
}

.editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
}

.editor-upload-btn {
    display: inline-block;
}
</style>
