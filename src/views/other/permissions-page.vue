<template>
    <div class="permissions">
        <el-divider content-position="left">演示</el-divider>
        <p class="item">你的权限：{{ userPermissions }}</p>
        <el-row align="middle">
            <el-col class="col-item" :span="2" :xs="24">
                <div>切换权限：</div>
            </el-col>
            <el-col :span="22" :xs="24">
                <el-button-group>
                    <template v-for="item in [['boss', 'admin'], ['boss'], ['admin'], ['user']]" :key="item">
                        <el-button
                            :type="userPermissions.toString() === item.toString() ? 'primary' : 'default'"
                            @click="changePermission(item)"
                        >
                            {{ item }}
                        </el-button>
                    </template>
                </el-button-group>
            </el-col>
        </el-row>
        <el-divider content-position="left">组件用法</el-divider>
        <Permissions :value="['boss', 'admin']">
            <el-row>
                <el-col class="col-item" :span="10" :xs="24">
                    <el-alert type="success" class="alert" :closable="false">
                        <p>Both <el-tag> boss </el-tag> or <el-tag> admin </el-tag> can see this</p>
                    </el-alert>
                </el-col>
                <el-col class="col-item" :span="14" :xs="24">
                    <el-tag type="info">{{ `<Permissions :value="['boss', 'admin']"> ... </Permissions>` }}</el-tag>
                </el-col>
            </el-row>
        </Permissions>
        <Permissions :value="['boss']">
            <el-row>
                <el-col class="col-item" :span="10" :xs="24">
                    <el-alert type="success" class="alert" :closable="false">
                        <p>Only <el-tag> boss </el-tag> can see this</p>
                    </el-alert>
                </el-col>
                <el-col class="col-item" :span="14" :xs="24">
                    <el-tag type="info">{{ `<Permissions :value="['boss']"> ... </Permissions>` }}</el-tag>
                </el-col>
            </el-row>
        </Permissions>
        <Permissions :value="['admin']">
            <el-row>
                <el-col class="col-item" :span="10" :xs="24">
                    <el-alert type="success" class="alert" :closable="false">
                        <p>Only <el-tag> admin </el-tag> can see this</p>
                    </el-alert>
                </el-col>
                <el-col class="col-item" :span="14" :xs="24">
                    <el-tag type="info">{{ `<Permissions :value="['admin']"> ... </Permissions>` }}</el-tag>
                </el-col>
            </el-row>
        </Permissions>
        <Permissions :value="['user']">
            <el-row>
                <el-col class="col-item" :span="10" :xs="24">
                    <el-alert type="success" class="alert" :closable="false">
                        <p>Only <el-tag> user </el-tag> can see this</p>
                    </el-alert>
                </el-col>
                <el-col class="col-item" :span="14" :xs="24">
                    <el-tag type="info">{{ `<Permissions :value="['user']"> ... </Permissions>` }}</el-tag>
                </el-col>
            </el-row>
        </Permissions>
        <el-divider content-position="left">指令用法 请刷新页面查看</el-divider>
        <el-row>
            <el-col>
                <el-button type="primary" @click="refersh">刷新</el-button>
            </el-col>
        </el-row>
        <el-row v-permissions="['boss', 'admin']">
            <el-col class="col-item" :span="10" :xs="24">
                <el-alert type="success" class="alert" :closable="false">
                    <p>Both <el-tag> boss </el-tag> or <el-tag> admin </el-tag> can see this</p>
                </el-alert>
            </el-col>
            <el-col class="col-item" :span="14" :xs="24">
                <el-tag type="info">v-permissions="['boss','admin']"</el-tag>
            </el-col>
        </el-row>
        <el-row v-permissions="['boss']">
            <el-col class="col-item" :span="10" :xs="24">
                <el-alert type="success" class="alert" :closable="false">
                    <p>Only <el-tag> boss </el-tag> can see this</p>
                </el-alert>
            </el-col>
            <el-col class="col-item" :span="14" :xs="24">
                <el-tag type="info">v-permissions="['boss']"</el-tag>
            </el-col>
        </el-row>
        <el-row v-permissions="['admin']">
            <el-col class="col-item" :span="10" :xs="24">
                <el-alert type="success" class="alert" :closable="false">
                    <p>Only <el-tag> admin </el-tag> can see this</p>
                </el-alert>
            </el-col>
            <el-col class="col-item" :span="14" :xs="24">
                <el-tag type="info">v-permissions="['admin']"</el-tag>
            </el-col>
        </el-row>
        <el-row v-permissions="['user']">
            <el-col class="col-item" :span="10" :xs="24">
                <el-alert type="success" class="alert" :closable="false">
                    <p>Only <el-tag> user </el-tag> can see this</p>
                </el-alert>
            </el-col>
            <el-col class="col-item" :span="14" :xs="24">
                <el-tag type="info"> v-permissions="['user']" </el-tag>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from "vue";
import { successMessage } from "@/util/message";
import { useStore } from "@/store";
export default defineComponent({
    name: "PermissionsPage",
    setup() {
        const store = useStore();

        const userPermissions = computed<string[]>(() => store.getters["user/permissions"]);

        const changePermission = (item: string) => {
            store.dispatch("user/SET_PERMISSIONS", item);
            successMessage("Switch Permissions Success");
        };

        const refersh = () => {
            window.location.reload();
        };

        return {
            changePermission,
            userPermissions,
            refersh,
        };
    },
    components: {
        Permissions: defineAsyncComponent(() => import("@/components/Permissions.vue")),
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
.col-item {
    display: flex;
    align-items: center;
}
.alert {
    width: 350px;
    p,
    span {
        font-size: 15px !important;
    }
}
</style>
