import Clipboard from "clipboard";
import { successMessage, errorMessage } from "@/util/message";

/**
 * @param: text {string}
 * @returns: {Promise}
 * @Description: Copy Text
 */

export function copyText(text: string) {
    return new Promise<Clipboard.Event>((resolve, reject) => {
        const btnElement = document.createElement("button");
        btnElement.style.display = "none";
        const clipboard = new Clipboard(btnElement, {
            text: function() {
                return text;
            },
            action: function() {
                return "copy";
            },
        });

        clipboard.on("success", function(e) {
            successMessage("Copy successfully");
            clipboard.destroy();
            e.clearSelection();
            resolve(e);
        });

        clipboard.on("error", function(e) {
            errorMessage("Copy failed");
            clipboard.destroy();
            reject(e);
        });
        btnElement && document.body.appendChild(btnElement);
        btnElement && btnElement.click();
        btnElement && document.body.removeChild(btnElement);
    });
}
