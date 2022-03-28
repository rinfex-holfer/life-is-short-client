import {LangKey} from "../utils/locale";

export type User = {
    name: string
    dateOfBirth: Date
    expectedLifespan: number // in years
    locale: LangKey
}

export type YearWeekLifeCalendar = {
    numInLife: number
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
    starts: Date,
    ends: Date,
}

type Post = {}

export type LifeStage = {
    fromTo: [number, number]
    color: string
}