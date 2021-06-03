import goods from "@/api/goods";
import report from "@/api/report";
import help from "@/api/help";

export function prefixCapi(url: string) {
    return "/capi" + url;
}

const index = {
    help,
    goods,
    report,
};

export default index;
