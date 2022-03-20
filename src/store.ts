import {ref} from "vue";
import {User} from "./domain";

export const currentUser = ref<User | undefined>(undefined)