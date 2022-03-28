import {User} from "../index";
import {LangKey} from "../../utils/locale";
import {pause} from "../../utils/pause";

export async function getUser(id: string): Promise<User> {
    await pause(50)
    return {
        // name: "Геннадий",
        name: "Федор Федорович",
        // dateOfBirth: new Date(1990, 10, 27),
        dateOfBirth: new Date(2000, 0, 1),
        expectedLifespan: 100,
        locale: LangKey.RU,
    }
}