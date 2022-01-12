import {User} from "../index";
import {LangKey} from "../../utils/locale";

export function getUser(id: string): Promise<User> {
    return Promise.resolve({
        name: "Геннадий",
        dateOfBirth: new Date(1990, 11, 27),
        expectedLifespan: 80,
        locale: LangKey.RU,
    })
}