import {ModalKey} from "./modal-key";
import {getAppRouter} from "../../router/app-router";

export function openModal(key: ModalKey) {
    const router = getAppRouter()

    router.push({
        query: {popup: key}
    })
}