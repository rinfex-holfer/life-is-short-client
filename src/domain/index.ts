import {LangKey} from "../utils/locale";

export type User = {
    id: string,
    name: string
    dateOfBirth: string
    expectedLifespan: number // in years
    locale: LangKey
}

export type YearWeekLifeCalendar = {
    numInLife: number
    weeks: LifeWeek[]
}[]

export type LifeWeek = {
    numInYear: number
    numInLife: number
    starts: Date,
    ends: Date,
}

export type LifeDay = {
    timestamp: string
    smile?: string
    color?: string
}

type Post = {
    id: string
    userId: string,
    timestamp: string,
    title?: string
    body: string
}

export type LifeStage = {
    fromTo: [number, number]
    color: string
}

type DbTables = {
    users: {
        userId: string
        name: string
        dateOfBirth: string
        expectedLifespan: number
        locale: LangKey
    },
    days: {
        userId: string
        timestamp: string // simplified? Like "12-03-2012"
        smile?: string
        color?: string
    },
    posts: {
        id: string
        userId: string,
        timestamp: string,
        title?: string
        body: string
    }
}

interface Api {
    getDays: (firstDay: string, lastDay: string) => LifeDay[]
    getPosts: (firstDay: string, lastDay: string) => Post[]
}