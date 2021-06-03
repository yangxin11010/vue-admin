<template>
    <div class="psersonCenter">
        <el-row :gutter="20">
            <el-col :span="6" :xs="24" :sm="8" :md="6">
                <el-card shadow="hover">
                    <template #header>
                        <span>{{ $t("personCenter.cardTitle") }}</span>
                    </template>
                    <div class="about-box">
                        <el-avatar
                            :size="100"
                            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                        ></el-avatar>
                        <p class="font_wb">Super Admin</p>
                        <p>Admin</p>
                    </div>
                    <div class="about-item">
                        <div class="about-item-top">
                            <svg-icon class="icon" icon-class="book" />
                            <span>{{ $t("personCenter.description") }}</span>
                        </div>
                        <div class="about-item-content">
                            Are you ok?
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18" :xs="24" :sm="16" :md="18">
                <el-card shadow="hover">
                    <el-tabs :before-leave="tabsBeforeLeave">
                        <el-tab-pane :label="$t('personCenter.account')">
                            <el-form label-width="auto">
                                <el-form-item label="Name：">
                                    <template #label>
                                        <span class="font_wb">{{ $t("personCenter.accountInfo.name") }}：</span>
                                    </template>
                                    <el-input class="form-input" v-model="name"></el-input>
                                </el-form-item>
                                <el-form-item label="Sex：">
                                    <template #label>
                                        <span class="font_wb">{{ $t("personCenter.accountInfo.sex") }}：</span>
                                    </template>
                                    <el-select class="form-input" v-model="sex">
                                        <el-option :label="$t('sex.male')" :value="1"></el-option>
                                        <el-option :label="$t('sex.female')" :value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="Eamil：">
                                    <template #label>
                                        <span class="font_wb">{{ $t("personCenter.accountInfo.email") }}：</span>
                                    </template>
                                    <el-input class="form-input" v-model="email"></el-input>
                                </el-form-item>
                                <el-form-item label="Introduction：">
                                    <template #label>
                                        <span class="font_wb">{{ $t("personCenter.accountInfo.introduction") }}：</span>
                                    </template>
                                    <el-input type="textarea" class="form-input" v-model="introduction"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary">{{ $t("button.save") }}</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane :label="$t('personCenter.loginRecord')">
                            <el-empty
                                v-if="loginTime.length <= 0"
                                v-loading="timeLoading"
                                description="暂无记录"
                            ></el-empty>
                            <el-timeline v-loading="timeLoading" v-else>
                                <el-timeline-item
                                    v-for="(item, index) in loginTime"
                                    :key="index"
                                    :timestamp="item.time"
                                    placement="top"
                                >
                                    <el-card shadow="hover">
                                        <div class="time-line">
                                            <table>
                                                <tr>
                                                    <td align="right">browser：</td>
                                                    <td>{{ item.browser }}</td>
                                                </tr>
                                                <tr>
                                                    <td align="right">system：</td>
                                                    <td>{{ item.system }}</td>
                                                </tr>
                                                <tr>
                                                    <td align="right">location：</td>
                                                    <td>
                                                        <span class="location">{{ item.country }}</span>
                                                        <span class="location">{{ item.province }}</span>
                                                        <span class="location">{{ item.city }}</span>
                                                        <span class="location">{{ item.area }}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                            <div class="pagination">
                                <my-pagination
                                    @current-change="loginPageChange"
                                    background
                                    v-model:current-page="loginData.page"
                                    :page-size="10"
                                    :total="loginData.total"
                                    layout="total,prev,pager,next,jumper"
                                >
                                </my-pagination>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane :label="$t('personCenter.editPwd')">
                            <el-form :model="passWord" ref="passFormRef" :rules="rules" label-width="auto">
                                <el-form-item prop="oldPass">
                                    <template #label>
                                        <span class="font_wb">{{ $t("personCenter.editPwdInfo.oldPwd") }}：</span>
                                    </template>
                                    <el-input
                                        class="form-input"
                                        v-model="passWord.oldPass"
                                        show-password
                                        clearable
                                    ></el-input>
                                </el-form-item>
                                <el-form-item prop="newPass">
                                    <template #label>
                                        <span class="font_wb">{{ $t("personCenter.editPwdInfo.newPwd") }}：</span>
                                    </template>
                                    <el-input
                                        class="form-input"
                                        v-model="passWord.newPass"
                                        show-password
                                        clearable
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" :loading="updateLoading" @click="updatePass">
                                        {{ $t("button.edit") }}
                                    </el-button>
                                    <el-button @click="reset">{{ $t("button.reset") }}</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { successMessage } from "@/util/message";
import { useI18n } from "vue-i18n";
import $api from "@/api";
import type { LoginInfoList } from "@model/api";


export default defineComponent({
    name: "PsersonCenter",
    setup() {
        const { t: $t } = useI18n();

        let states = reactive({
            name: "Super Admin",
            sex: 1,
            email: "yx17714503091@163.com",
            introduction: "又是充满希望的一天！",
        });

        let passWord = reactive({
            oldPass: "",
            newPass: "",
        });

        const updateLoading = ref(false);

        const passFormRef = ref();
        const rules = reactive({
            oldPass: [
                {
                    validator: (rule: any, value: string, callback: any) => {
                        if (value) {
                            callback();
                        } else {
                            callback(new Error($t("personCenter.editPwdInfo.requireError")));
                        }
                    },
                    trigger: "change",
                },
                {
                    validator: (rule: any, value: string, callback: any) => {
                        if (value.length < 6) {
                            callback(new Error($t("personCenter.editPwdInfo.less6Error")));
                        } else if (value !== "" && value !== passWord.newPass) {
                            callback(new Error($t("personCenter.editPwdInfo.differentError")));
                        } else {
                            passFormRef.value.clearValidate();
                            callback();
                        }
                    },
                    trigger: "change",
                },
            ],
            newPass: [
                {
                    validator: (rule: any, value: string, callback: any) => {
                        if (value) {
                            callback();
                        } else {
                            callback(new Error($t("personCenter.editPwdInfo.requireError")));
                        }
                    },
                    trigger: "change",
                },
                {
                    validator: (rule: any, value: string, callback: any) => {
                        if (value.length < 6) {
                            callback(new Error($t("personCenter.editPwdInfo.less6Error")));
                        } else if (value !== "" && value !== passWord.oldPass) {
                            callback(new Error($t("personCenter.editPwdInfo.differentError")));
                        } else {
                            passFormRef.value.clearValidate();
                            callback();
                        }
                    },
                    trigger: "change",
                },
            ],
        });

        // 修改密码
        const updatePass = () => {
            passFormRef.value.validate((valid: boolean) => {
                if (valid) {
                    updateLoading.value = true;
                    setTimeout(() => {
                        successMessage("Update Successfully");
                        reset()
                        updateLoading.value = false;
                    }, 1000);
                } else {
                    return false;
                }
            });
        };
        // 重置
        const reset = () => {
            passFormRef.value.resetFields();
        };

        // tabs 切换
        const tabsBeforeLeave = (activeName: string) => {
            if(activeName === "1" && loginTime.value.length <= 0){
                getLoginIngo()
            }
        };

        // 登录信息
        const timeLoading = ref(true);
        const loginTime = ref<Array<LoginInfoList>>([]);
        const loginData = reactive({
            page: 1,
            total: 0,
        })
        const loginPageChange = (e: number) => {
            loginData.page = e;
            getLoginIngo()
        };

        const getLoginIngo = async () => {
            timeLoading.value = true;
            const { data } =  await $api.report.queryLoginInfo({
                page: loginData.page,
            });
            loginData.total = data.pageCount
            loginTime.value = data.list
            timeLoading.value = false;
        }

        return {
            loginTime,
            timeLoading,
            tabsBeforeLeave,
            loginPageChange,
            ...toRefs(states),
            loginData,
            passWord,
            passFormRef,
            reset,
            updatePass,
            updateLoading,
            rules,
        };
    },
});
</script>

<style lang="scss" scoped>
.about-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    p {
        margin-top: 10px;
    }
}
.form-input {
    max-width: 350px;
}
.about-item {
    font-size: 14px;
    padding: 15px 0;
}
.time-line > p {
    margin-bottom: 3px;
}
.location {
    margin-right: 3px;
}
.about-item-top {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dfe6ec;
    padding-bottom: 10px;
    margin-bottom: 10px;
    .icon {
        font-size: 18px;
    }
    span {
        margin-left: 5px;
        font-weight: 700;
        color: #606266;
    }
}
.about-item-content {
    color: #777;
}
</style>
