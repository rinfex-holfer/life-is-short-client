import {PopupKey} from "./popup-key";
import {getAppRouter} from "../../router/app-router";

export function openPopup(key: PopupKey) {
    const router = getAppRouter()

    router.push({
        query: {popup: key}
    })
}