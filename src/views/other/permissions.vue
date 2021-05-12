<template>
    <div class="permissions">
        <el-divider content-position="left">指令权限</el-divider>
        <p class="item">你的权限：{{ userPermissions }}</p>
        <div class="item">
            <div>切换权限：</div>
            <el-button-group>
                <template v-for="item in [['boss', 'admin'], ['boss'], ['admin'], ['user']]" :key="item">
                    <el-button
                        size="medium"
                        :type="userPermissions.toString() === item.toString() ? 'primary' : 'default'"
                        @click="changePermission(item)"
                    >
                        {{ item }}
                    </el-button>
                </template>
            </el-button-group>
        </div>
        <el-divider content-position="left">演示</el-divider>
        <div class="item" v-permissions="['boss', 'admin']">
            <el-alert type="success" class="alert" :closable="false">
                <p>Both <el-tag> boss </el-tag> and <el-tag> admin </el-tag> can see this</p>
            </el-alert>
            <el-tag type="info">v-permissions="['boss','admin']"</el-tag>
        </div>
        <div class="item" v-permissions="['boss']">
            <el-alert type="success" class="alert" :closable="false">
                <p>Only <el-tag> boss </el-tag> can see this</p>
            </el-alert>
            <el-tag type="info">v-permissions="['boss']"</el-tag>
        </div>
        <div class="item" v-permissions="['admin']">
            <el-alert type="success" class="alert" :closable="false">
                <p>Only <el-tag> admin </el-tag> can see this</p>
            </el-alert>
            <el-tag type="info">v-permissions="['admin']"</el-tag>
        </div>
        <div class="item" v-permissions="['user']">
            <el-alert type="success" class="alert" :closable="false">
                <p>Only <el-tag> user </el-tag> can see this</p>
            </el-alert>
            <el-tag type="info"> v-permissions="['user']" </el-tag>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { successMessage } from "@/util/message";
import { useStore } from "@/store";
export default defineComponent({
    name: "Permissions",
    setup() {
        const store = useStore();

        const userPermissions = computed<string[]>(() => store.getters.permissions);

        const changePermission = (item: string) => {
            store.dispatch("SET_PERMISSIONS", item);
            successMessage("Switch Permissions Success");
            setTimeout(() => {
                window.location.reload();
            }, 500);
        };

        return {
            changePermission,
            userPermissions,
        };
    },
});
</script>

<style lang="scss" scoped>
.item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    & > span {
        margin-left: 20px;
    }
}
.alert {
    width: 350px;
    p,
    span {
        font-size: 15px !important;
    }
}
</style>
