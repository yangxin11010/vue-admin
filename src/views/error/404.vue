<template>
    <div class="FourZeroFour disflex align-it-cen ju_cen flex-dir-c">
        <div class="disflex align-it-cen ju_cen overhide">
            <svg-icon class="svgicon" icon-class="404" />
        </div>
        <div>
            <el-button class="btn" type="primary" round @click="back(0)">{{ $t("error.backHome") }}</el-button>
            <el-button class="btn" type="primary" round @click="back(1)">{{ $t("error.backLast") }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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

        return {
            back,
        };
    },
});
</script>

<style lang="scss" scoped>
.FourZeroFour {
    width: 100%;
    height: calc(100vh - 200px);
    & > div:nth-child(1) {
        width: 320px;
        height: 160px;
        margin-bottom: 20px;
    }
}
.svgicon {
    transform: scale(20);
}
</style>
