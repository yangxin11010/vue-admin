<template>
    <div class="search">
        <transition name="fade">
            <!-- <el-input
                ref="inputRef"
                v-show="showInput"
                class="search-input"
                v-model="searchValue"
                clearable
                size="mini"
                placeholder="Search"
                @blur="inputOperate(1)"
            ></el-input> -->
            <el-select
                ref="inputRef"
                class="search-input"
                v-show="showInput"
                v-model="searchValue"
                filterable
                remote
                reserve-keyword
                size="mini"
                clearable
                placeholder="Search"
                :remote-method="remoteMethod"
                :loading="loading"
                @blur="inputOperate(1)"
            >
                <el-option
                    v-for="item in searchResult"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </transition>
        <div class="search-icon" @click="inputOperate(0)">
            <i class="el-icon-search" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from "vue";
import { Menu } from "@/model/views";
import { useStore } from "@/store";

export default defineComponent({
    name: "Search",
    props: {},
    setup() {
        const store = useStore();
        const showInput = ref(false);
        const inputRef = ref();

        const searchValue = ref("");

        const menuList = computed<Menu[]>(() => store.getters.menuList);

        const inputOperate = async (type: number) => {
            console.log(type);
            // showInput.value = !showInput.value;
            if (type === 0) {
                showInput.value = true;
                await nextTick();
                inputRef.value.focus();
            }else {
                showInput.value = false;
            }
        };

        const loading = ref(false);
        const remoteMethod = () => {};
        const searchResult = ref<Menu[]>([]);

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
}
.search-icon {
    height: 100%;
    font-size: 20px;
    padding: 0 10px;
    display: flex;
    align-items: center;
}
.search-input {
    margin-left: 10px;
    margin-right: 10px;
}

.fade-enter-active,
.fade-leave-active {
    opacity: 1;
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1),
        -webkit-transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), -webkit-transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1),
        -webkit-transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    -webkit-transform-origin: center right;
    transform-origin: center right;
}

.fade-enter-from,
.fade-leave-active {
    opacity: 0;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
}
</style>
