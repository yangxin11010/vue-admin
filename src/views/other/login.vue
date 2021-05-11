<template>
    <div class="login disflex ju_cen align-it-cen">
        <el-form class="loginForm" ref="loginFormRef" :model="formData" :rules="rules">
            <div class="loginForm-title">
                <h2>{{ $t("login.title") }}</h2>
                <div class="lang curpot">
                    <el-dropdown placement="bottom-end" size="medium" trigger="click" @command="changeLang">
                        <div class="lang-select lang-icon">
                            <svg-icon icon-class="language" />
                        </div>
                        <template #dropdown>
                            <template v-for="locale in availableLocales" :key="`locale-${locale}`">
                                <el-dropdown-item :command="locale" :disabled="lang === locale">
                                    {{ langSetting[locale] }}
                                </el-dropdown-item>
                            </template>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <el-form-item prop="username">
                <el-input
                    class="input"
                    v-model="formData.username"
                    prefix-icon="el-icon-user"
                    :placeholder="$t('login.username')"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    class="input"
                    v-model="formData.password"
                    prefix-icon="el-icon-lock"
                    :placeholder="$t('login.password')"
                    show-password
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="submit" type="primary" :loading="loading" v-keyboard:enter="submit" @click="submit">
                    {{ $t("login.button") }}
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import { availableLocales, langSetting } from "@/lang";
import { useRouter, useRoute } from "vue-router";
import { successMessage } from "@/util/message";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: "Login",
    setup() {
        const router = useRouter(),
            route = useRoute(),
            store = useStore(),
            { t: $t } = useI18n();

        const loginFormRef = ref(),
            lang = computed<string>(() => store.getters.lang),
            loading = ref(false);

        const changeLang = async (e: string) => {
            await store.dispatch("SET_LANG", e);
            window.location.reload();
            // locale.value = e;
        };

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
                    message: $t("login.unameReq"),
                    trigger: "blur",
                },
            ],
            password: [
                {
                    required: true,
                    message: $t("login.pwdReq"),
                    trigger: "blur",
                },
                {
                    min: 6,
                    message: $t("login.pwdError"),
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
                    setTimeout(async () => {
                        // 初始化 collsape 值
                        await store.dispatch("SET_COLLAPSE", false);
                        // 移除tabs
                        await store.dispatch("INIT_TABS");
                        successMessage($t("login.success"));
                        setTimeout(() => {
                            router.replace(path ? path : "/dashboard");
                        }, 1000);
                    }, 1000);
                } else {
                    return false;
                }
            });
        };

        return {
            lang,
            changeLang,
            loginFormRef,
            formData,
            submit,
            loading,
            rules,
            langSetting,
            availableLocales,
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
    position: relative;
}
.lang {
    position: absolute;
    right: 0;
    top: 0;
}
.lang-select {
    color: #fff;
    font-size: 16px;
}
.input {
    height: 50px;
    line-height: 50px;
}
.submit {
    width: 100%;
}
/deep/ {
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
        i {
            font-size: 18px !important;
            position: relative;
            top: 2px;
        }
    }
}
</style>
