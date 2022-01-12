import {LangKey} from "../utils/locale";

export type User = {
    name: string
    dateOfBirth: Date
    expectedLifespan: number // in years
    locale: LangKey
}

type Calendar = {

}

type Day = {
    timestamp: string
    smile?: string
    color?: string
    posts?: Post[]
}

type Post = {

}