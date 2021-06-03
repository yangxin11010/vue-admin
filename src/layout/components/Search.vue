<template>
    <div
        :class="{
            'search-default': mode === 'default',
            'search-fixed': mode === 'fixed',
            show: mode === 'fixed' ? true : showInput,
        }"
    >
        <div v-if="mode === 'fixed'" v-show="fixedShow" class="search-back-fixed" @click="closeFixed"></div>
        <el-select
            ref="inputRef"
            v-show="mode === 'default' ? true : fixedShow"
            :class="{
                'search-input-default': mode === 'default',
                'search-input-fixed': mode === 'fixed',
            }"
            v-model="searchValue"
            filterable
            remote
            reserve-keyword
            size="mini"
            clearable
            placeholder="Search"
            :remote-method="remoteMethod"
            :loading="loading"
        >
            <el-option
                v-for="item in searchResult"
                :key="item.value"
                :label="mergeParentTitle(item.parentMenuId, item.path)"
                :value="item.path + ',' + item.realPath + ',' + item.parentMenuId"
            ></el-option>
        </el-select>

        <div class="search-icon" @click.stop="inputOperate">
            <i class="np-icon-search" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch, PropType } from "vue";
import MenuList from "@/assets/js/menuList";
import type { Menu } from "@/model/views";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { checkLink } from "@/util/validata";
import { openWindow } from "@/util";
import { useI18n } from "vue-i18n"
import { getParentMenuList } from "@/util";

export default defineComponent({
    name: "Search",
    props: {
        mode: {
            type: String as PropType<"default" | "fixed">,
            default: "default"
        }
    },
    setup(props) {
        const store = useStore(),
            router = useRouter(),
            { t: $t } = useI18n(),
            inputRef = ref(),
            showInput = ref(false), // default 显示输入框
            loading = ref(false),   // 加载
            searchValue = ref(""),  // 搜索关键字
            fixedShow = ref(false), // 控制元素
            searchResult = ref<Array<Menu>>([]), // 返回结果
            menuList = computed<Array<Menu>>(() => store.getters["user/menuList"]);

        const close = () => {
            showInput.value = false;
            searchResult.value = [];
        };

        const inputOperate = async () => {
            if(props.mode === "fixed") fixedShow.value = true;
            showInput.value = true;
            await nextTick();
            inputRef.value.focus();
        };

        const closeFixed = () => {
            if(props.mode === "fixed"){
                fixedShow.value = false;
                searchValue.value = "";
            }
        };

        // 模糊查询 --> 模拟后端接口
        const retrieve = (s: string, list: Array<Menu>): Array<Menu> => {
            let result: Array<Menu> = [];
            list.forEach((item) => {
                if (item.children.length === 0 && (item.path.includes(s) || item.title.includes(s))) {
                    result.push(item);
                }
                if (item.children.length > 0) {
                    result = result.concat(retrieve(s, item.children));
                }
            });
            return result;
        };

        // 模糊查询  --> 实际调后端接口
        const search = (s: string) => {
            return new Promise<Array<Menu>>((resolve) => {
                const result: Array<Menu> = retrieve(s, MenuList);
                setTimeout(() => {
                    resolve(result);
                }, 1000);
            });
        };

        const remoteMethod = async (e: string) => {
            if (e) {
                loading.value = true;
                searchResult.value = await search(e);
                loading.value = false;
            } else {
                searchResult.value = [];
            }
        };

        // 合并 父元素菜单
        const mergeParentTitle = (parentId: number, path: string) => {
            const list = getParentMenuList(parentId, MenuList).map(item => item.path)
            list.push(path)
            list.forEach((item, index) => {
                if(index > 0){
                    list[index] =  list[index - 1] + item
                }
            })
            return list.map(item => $t('aside.' + item)).join(" > ")
        }

        // 开始搜索
        watch(searchValue, (value) => {
            if (value) {
                searchValue.value = "";
                searchResult.value = [];
                close();
                closeFixed();
                setTimeout(() => {
                    const path = value.split(",")[0],
                        realPath = value.split(",")[1],
                        parentMenuId = Number(value.split(",")[2]);
                    if (checkLink(realPath)) {
                        openWindow(realPath);
                    } else {
                        router.push(getParentMenuList(parentMenuId, MenuList).map(item => item.path).join("") + path);
                    }
                }, 200);
            }
        });

        watch(showInput, (value) => {
            if (value) {
                document.body.addEventListener("click", close);
            } else {
                document.body.removeEventListener("click", close);
            }
        });

        return {
            inputRef,
            searchValue,
            showInput,
            inputOperate,
            menuList,
            remoteMethod,
            loading,
            searchResult,
            mergeParentTitle,
            fixedShow,
            closeFixed
        };
    },
});
</script>

<style lang="scss" scoped>
.search-default {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    cursor: pointer;

    &.show {
        .search-input-default {
            width: 210px;
        }
    }
}
.search-back-fixed {
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2001;
}
.search-icon {
    height: 100%;
    font-size: 20px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
}
.search-input-default {
    width: 0;
    display: inline-block;
    font-size: 18px;
    transition: width 0.2s;
    overflow: hidden;
    border: none;
    :deep(.el-input__inner) {
        border-radius: 0;
        border: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;
        border-bottom: 1px solid #d9d9d9 !important;
        vertical-align: middle;
    }
}
.search-input-fixed {
    width: 300px;
    position: fixed;
    top: 100px;
    left: calc((100vw - 300px) / 2);
    z-index: 2001;
    :deep(.el-input__inner) {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }
}
</style>
