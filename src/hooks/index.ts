import { ref, Ref, onBeforeMount, watch } from "vue";
import { location, session } from "@/util/storage";
import mitter from "@/plugins/mitt";
import { isObject } from "@/util/validata";

export interface UseLocationOptions<T> {
    name: string;
    value: T;
    isWatch?: boolean;
    storage?: "session" | "location";
}

/**
 * useLocation
 * @param options
 * @returns
 */
export function useLocation<T = any>(options: UseLocationOptions<T>): Ref<T> {
    const refValue = ref<T>(options.value) as Ref<T>;

    watch(
        () => refValue.value,
        (value) => {
            if (!options.isWatch) {
                mitter.$emit<boolean>(options.name, value as any);
                if (options.storage && options.storage === "session") {
                    session.setItem(options.name, value);
                } else {
                    location.setItem(options.name, value);
                }
            }
        },
        {
            // deep: typeof options.value === "object",
            deep: isObject(options.value),
        }
    );

    onBeforeMount(() => {
        let locationValue: T;
        if (options.storage && options.storage === "session") {
            locationValue = session.getItem(options.name);
        } else {
            locationValue = location.getItem(options.name);
        }
        locationValue !== null && (refValue.value = locationValue);
        options.isWatch &&
            options.isWatch === true &&
            mitter.$on(options.name, (value) => {
                refValue.value = value;
            });
    });
    return refValue;
}


