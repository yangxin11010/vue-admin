<template>
    <div class="search" :class="{ show: showInput }">
        <el-select
            ref="inputRef"
            class="search-input"
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
import { computed, defineComponent, nextTick, ref, watch } from "vue";
import MenuList from "@/assets/js/menuList";
import type { Menu } from "@/model/views";
import { useStore } from "@/store";
import router from "@/router";
import { checkLink } from "@/util/validata";
import { openWindow } from "@/util";
import { useI18n } from "vue-i18n"

export default defineComponent({
    name: "Search",
    setup() {
        const store = useStore(),
            { t: $t } = useI18n(),
            inputRef = ref(),
            menuList = computed<Array<Menu>>(() => store.getters.menuList),
            showInput = ref(false),
            loading = ref(false),
            searchValue = ref(""),
            searchResult = ref<Array<Menu>>([]);

        const close = () => {
            showInput.value = false;
            searchResult.value = [];
        };

        const inputOperate = async () => {
            showInput.value = true;
            await nextTick();
            inputRef.value.focus();
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

        // 根据parentMenuId查找 父菜单
        const getAllRouterByParentMenuId = (parentId: number, list: Array<Menu>) => {
            let parentRouter:Menu | undefined;
            list.forEach((item) => {
                if (item.menuId === parentId) {
                    parentRouter = item;
                }
                if(!parentRouter && item.children.length > 0){
                    parentRouter = getAllRouterByParentMenuId(parentId, item.children);
                }
            });
            return parentRouter;
        };

        const mergeParent = (parentId: number) => {
            if(!parentId)return []
            let list: Array<Menu> = [];
            const parentMenu = getAllRouterByParentMenuId(parentId, MenuList);
            parentMenu && list.push(parentMenu)
            if(parentMenu && parentMenu.parentMenuId) {
                const nextParentMenu = getAllRouterByParentMenuId(parentMenu.parentMenuId, MenuList)
                nextParentMenu && (list.push(nextParentMenu))
            }
            return list.reverse()
        }


        // 合并 父元素菜单
        const mergeParentTitle = (parentId: number, path: string) => {
            const list = mergeParent(parentId).map(item => item.path)
            list.push(path)
            list.forEach((item, index) => {
                if(index > 0){
                    list[index] =  list[index - 1] + item
                }
            })
            return list.map(item => $t('aside.' + item)).join(" > ")
        }

        watch(searchValue, (value) => {
            if (value) {
                searchValue.value = "";
                searchResult.value = [];
                close();
                setTimeout(() => {
                    const path = value.split(",")[0],
                        realPath = value.split(",")[1],
                        parentMenuId = Number(value.split(",")[2]);
                    if (checkLink(realPath)) {
                        openWindow(realPath);
                    } else {
                        router.push(mergeParent(parentMenuId).map(item => item.path).join("") + path);
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
            mergeParentTitle
        };
    },
});
</script>

<style lang="scss" scoped>
.search {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    cursor: pointer;

    &.show {
        .search-input {
            width: 210px;
        }
    }
}
.search-icon {
    height: 100%;
    font-size: 20px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    font-weight: bold;
}
.search-input {
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
</style>
