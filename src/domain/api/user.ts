import {User} from "../index";
import {LangKey} from "../../utils/locale";
import {pause} from "../../utils/pause";

export async function getUser(id: string): Promise<User> {
    await pause(50)
    return {
        id: "qwerty",
        name: "Геннадий",
        dateOfBirth: "1990-11-26T23:00:00.000Z",
        // name: "Федор Федорович",
        // dateOfBirth: new Date(2000, 0, 1),
        expectedLifespan: 70,
        locale: LangKey.RU,
    }
}