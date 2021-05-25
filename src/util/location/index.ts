import AMapLoader from "@amap/amap-jsapi-loader";

/**
 * get location
 * @param type
 * @returns Promise
 */
export const getLocation = (type: "location" | "place" = "location") => {
    return new Promise<any>((resolve, reject) => {
        AMapLoader.load({
            key: process.env.VUE_APP_GKEY as string, // 申请好的Web端开发者Key，首次调用 load 时必填
            version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        })
            .then((AMap) => {
                AMap.plugin("AMap.Geolocation", function() {
                    const geolocation = new AMap.Geolocation({
                        // 是否使用高精度定位，默认：true
                        enableHighAccuracy: true,
                        // 设置定位超时时间，默认：无穷大
                        timeout: 0,
                    });

                    geolocation[type === "place" ? "getCityInfo" : "getCurrentPosition"](function(
                        status: string,
                        result: any
                    ) {
                        if (status == "complete") {
                            onComplete(result);
                        } else {
                            onError(result);
                        }
                    });
                    function onComplete(data: any) {
                        resolve(data);
                    }
                    function onError(e: any) {
                        // 定位出错
                        reject(e);
                    }
                });
            })
            .catch((e) => {
                reject(e);
            });
    });
};
