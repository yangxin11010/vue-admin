<template>
    <div class="psersonCenter">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card shadow="hover">
                    <template #header>
                        <span>About Me</span>
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
                            <span>Description</span>
                        </div>
                        <div class="about-item-content">
                            Are you ok?
                        </div>
                    </div>
                    <div class="about-item">
                        <div class="about-item-top">
                            <svg-icon class="icon" icon-class="book" />
                            <span>Description</span>
                        </div>
                        <div class="about-item-content">
                            Are you ok?
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card shadow="hover">
                    <el-tabs>
                        <el-tab-pane label="Timeline">
                            <el-timeline>
                                <el-timeline-item
                                    v-for="(item, index) in loginTime"
                                    :key="index"
                                    :timestamp="item.time"
                                    placement="top"
                                >
                                    <el-card shadow="hover">
                                        <div class="time-line">
                                            <div>IP：{{ item.ip }}</div>
                                            <div>browser：{{ item.browser }}</div>
                                            <div>system：{{ item.system }}</div>
                                        </div>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </el-tab-pane>
                        <el-tab-pane label="Account">
                            <el-form>
                                <el-form-item>
                                    <template #label>
                                        <span class="font_wb">Name</span>
                                    </template>
                                    <el-input v-model="name"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <template #label>
                                        <span class="font_wb">Email</span>
                                    </template>
                                    <el-input v-model="email"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="Edit password">
                            <el-form :model="passWord" ref="passFormRef" :rules="rules">
                                <el-form-item prop="oldPass">
                                    <template #label>
                                        <span class="font_wb">Old Password</span>
                                    </template>
                                    <el-input v-model="passWord.oldPass" show-password></el-input>
                                </el-form-item>
                                <el-form-item prop="newPass">
                                    <template #label>
                                        <span class="font_wb">New Password</span>
                                    </template>
                                    <el-input v-model="passWord.newPass" show-password></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" :loading="updateLoading" @click="updatePass"
                                        >update</el-button
                                    >
                                    <el-button @click="reset">reset</el-button>
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

export default defineComponent({
    name: "PsersonCenter",
    setup() {
        const loginTime = ref([
            {
                ip: "183.195.52.197,106.13.130.94",
                browser: "Chrome 85",
                system: "Windows 10",
                time: "2020-09-05 00:44:06",
            },
            {
                ip: "183.195.52.197,106.13.130.94",
                browser: "Chrome 85",
                system: "Windows 10",
                time: "2020-09-05 00:44:06",
            },
            {
                ip: "183.195.52.197,106.13.130.94",
                browser: "Chrome 85",
                system: "Windows 10",
                time: "2020-09-05 00:44:06",
            },
            {
                ip: "183.195.52.197,106.13.130.94",
                browser: "Chrome 85",
                system: "Windows 10",
                time: "2020-09-05 00:44:06",
            },
        ]);

        let states = reactive({
            name: "Super Admin",
            email: "yx17714503091@163.com",
        });

        let passWord = reactive({
            oldPass: "",
            newPass: "",
        });

        let updateLoading = ref(false);

        const passFormRef = ref();
        const rules = reactive({
            oldPass: [
                {
                    required: true,
                    message: "The Old Password cannot be empty",
                    trigger: "change",
                },
                {
                    validator: (rule: any, value: string, callback: any) => {
                        if (value !== "" && value !== passWord.newPass) {
                            callback(new Error("Inconsistent passwords entered twice!"));
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
                    required: true,
                    message: "The New Password cannot be empty",
                    trigger: "change",
                },
                {
                    validator: (rule: any, value: string, callback: any) => {
                        if (value !== "" && value !== passWord.oldPass) {
                            callback(new Error("Inconsistent passwords entered twice!"));
                        } else {
                            passFormRef.value.clearValidate();
                            callback();
                        }
                    },
                    trigger: "change",
                },
            ],
        });
        const updatePass = () => {
            passFormRef.value.validate((valid: boolean) => {
                if (valid) {
                    updateLoading.value = true;
                    setTimeout(() => {
                        successMessage("Update Successfully");
                        passFormRef.value.resetFields();
                        updateLoading.value = false;
                    }, 1000);
                } else {
                    return false;
                }
            });
        };
        const reset = () => {
            passFormRef.value.resetFields();
        };
        return {
            loginTime,
            ...toRefs(states),
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

.about-item {
    font-size: 14px;
    padding: 15px 0;
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
