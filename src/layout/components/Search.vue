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
                :label="item.title + ' > ' + item.path"
                :value="item.path"
            ></el-option>
        </el-select>
        <div class="search-icon" @click.stop="inputOperate">
            <i class="el-icon-search" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from "vue";
import MenuList from "@/assets/js/menuList";
import { Menu } from "@/model/views";
import { useStore } from "@/store";
import router from "@/router";

export default defineComponent({
    name: "Search",
    setup() {
        const store = useStore(),
            inputRef = ref(),
            menuList = computed<Menu[]>(() => store.getters.menuList),
            showInput = ref(false),
            loading = ref(false),
            searchValue = ref(""),
            searchResult = ref<Menu[]>([]);

        const close = () => {
            showInput.value = false;
            searchResult.value = [];
        };

        const inputOperate = async () => {
            showInput.value = true;
            await nextTick();
            inputRef.value.focus();
        };

        const search = (s: string) => {
            return new Promise<Menu[]>((resolve) => {
                const result = MenuList.filter((item) => {
                    return item.children.length === 0 && (item.path.includes(s) || item.title.includes(s));
                });
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

        watch(searchValue, (value) => {
            if (value) {
                searchValue.value = "";
                searchResult.value = [];
                close();
                setTimeout(() => {
                    router.push(value);
                }, 300);
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
}
.search-input {
    width: 0;
    display: inline-block;
    font-size: 18px;
    transition: width 0.2s;
    overflow: hidden;
}
</style>
