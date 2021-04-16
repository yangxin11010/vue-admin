<template>
    <div class="FourZeroOne disflex align-it-cen ju_cen overhide">
        <div class="disflex align-it-cen ju_cen overhide"></div>
        <div class="disflex flex-dir-c">
            <div>
                <el-button class="btn" type="primary" round @click="back(0)">Back to home</el-button>
            </div>
            <div>
                <el-button class="btn" type="primary" round @click="back(1)">Back last page</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "FourZeroFour",
    setup() {
        const router = useRouter();

        const back = (index: number) => {
            switch (index) {
                case 0:
                    router.push("/dashboard");
                    break;
                case 1:
                    router.back();
                    break;
            }
        };

        const options = reactive({
            name: 123,
        });

        return {
            back,
            options,
        };
    },
});
</script>

<style lang="scss" scoped>
.FourZeroOne {
    width: 100%;
    height: calc(100vh - 120px);
    & > div:nth-child(1) {
        background-image: url("../../assets/images/401.gif");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        user-select: none;
        width: 213px;
        height: 300px;
        margin-right: 20px;
    }
}
.btn {
    width: 144px;
    margin-bottom: 20px;
}
.svgicon {
    transform: scale(20);
}
</style>
