import {User} from "../index";
import {LangKey} from "../../utils/locale";
import {pause} from "../../utils/pause";

export async function getUser(id: string): Promise<User> {
    await pause(50)
    return {
        name: "Геннадий",
        dateOfBirth: new Date(1990, 11, 27),
        expectedLifespan: 80,
        locale: LangKey.RU,
    }
}