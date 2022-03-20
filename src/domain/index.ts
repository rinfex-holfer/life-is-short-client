import {LangKey} from "../utils/locale";

export type User = {
    name: string
    dateOfBirth: Date
    expectedLifespan: number // in years
    locale: LangKey
}

export type WeekCalendar = {
    year: number
    weeks: Week[]
}[]

export type Day = {
    timestamp: string
    smile?: string
    color?: string
    posts?: Post[]
}

export type Week = {
    numInYear: number,
    numInLife: number
    starts: string,
    ends: string,
}

type Post = {

}