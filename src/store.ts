import {reactive} from "vue";
import {User} from "./domain";

interface Store {
    user: User | undefined
}

export const store = reactive<Store>({
    user: undefined,
})