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

export type Week = {
    numInYear: number,
    numInLife: number
    starts: Date,
    ends: Date,
}

export type Day = {
    timestamp: string
    smile?: string
    color?: string
}

type Post = {
    uId: number,
    timestamp: Date,
    body: string
}

export type LifeStage = {
    fromTo: [number, number]
    color: string
}

type DbTables = {
    users: {
        uId: string
        name: string
        dateOfBirth: string
        expectedLifespan: number
        locale: LangKey
    },
    days: {
        uId: string
        timestamp: string // simplified? Like "12-03-2012"
        smile?: string
        color?: string
    },
    posts: {
        uId: string
        timestamp: string
        body: string
    }
}