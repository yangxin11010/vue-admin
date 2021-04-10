<template>
    <div class="login disflex ju_cen align-it-cen">
        <el-form class="loginForm" ref="loginFormRef" :model="formData" :rules="rules">
            <div class="loginForm-title">
                <h2>系统登录</h2>
            </div>
            <el-form-item prop="username">
                <el-input
                    class="input"
                    v-model="formData.username"
                    prefix-icon="el-icon-user"
                    placeholder="账号"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    class="input"
                    v-model="formData.password"
                    prefix-icon="el-icon-lock"
                    placeholder="密码"
                    show-password
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="submit" type="primary" :loading="loading" @click="submit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/store/index";
import { ElMessage } from "element-plus";
export default defineComponent({
    name: "Login",
    setup() {
        const router = useRouter();
        const route = useRoute();
        const store = useStore();

        const loading = ref(false);

        const loginFormRef = ref();

        // 表单数据
        const formData = reactive({
            username: "admin",
            password: "123456",
        });

        // 校验规则
        const rules: object = {
            username: [
                {
                    required: true,
                    message: "Please enter the correct username",
                    trigger: "blur",
                },
            ],
            password: [
                {
                    required: true,
                    message: "Please enter the correct password",
                    trigger: "blur",
                },
                {
                    min: 6,
                    message: "The password can not be less than 6 digits",
                    trigger: "blur",
                },
            ],
        };

        // 登录
        const submit = () => {
            loginFormRef.value.validate((valid: boolean) => {
                if (valid) {
                    loading.value = true;
                    store.dispatch("LOGIN", "a1vb1-da598-dadsa-nahds");
                    const path = route.query.path as string;
                    setTimeout(() => {
                        // 初始化 collsape 值
                        store.dispatch("SET_COLLAPSE", false);
                        // 移除tabs
                        store.dispatch("INIT_TABS");
                        ElMessage({
                            message: "登录成功!",
                            type: "success",
                            duration: 2000,
                        });
                        setTimeout(() => {
                            router.replace(path ? path : "/dashboard");
                        }, 1000);
                    }, 1500);
                } else {
                    return false;
                }
            });
        };

        return {
            loginFormRef,
            formData,
            submit,
            loading,
            rules,
        };
    },
});
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
}
.loginForm {
    width: 500px;
    padding: 35px;
}
.loginForm-title {
    text-align: center;
    color: #ffffff;
    margin-bottom: 50px;
}
.input {
    height: 50px;
    line-height: 50px;
}
.submit {
    width: 100%;
}
</style>
<style lang="scss">
.login {
    .el-form-item {
        border: 1px solid hsla(0, 0%, 100%, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
    .el-input {
        .el-input__inner {
            background-color: rgb(40, 52, 67);
            border: none;
            color: #ffffff;
        }
    }
}
</style>
