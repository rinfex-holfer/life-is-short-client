import {
    add, differenceInCalendarWeeks,
    formatDistanceToNowStrict, getDayOfYear,
    getISODay,
    getISOWeek,
    getISOWeeksInYear, getWeek,
    getWeekOfMonth,
    getWeeksInMonth, getYear
} from 'date-fns'
import {getLocale} from "./locale";

export function getYearsLeft(dateOfBirth: Date, lifespanInYears: number): string {
    const dateOfDeath = add(dateOfBirth, {years: lifespanInYears})
    return formatDistanceToNowStrict(dateOfDeath, {unit: "year", locale: getLocale()})
}

export function getProductiveYearsLeft(dateOfBirth: Date, lifespanInYears: number): string {
    const dateOfDeath = add(dateOfBirth, {years: lifespanInYears - 15})
    return formatDistanceToNowStrict(dateOfDeath, {unit: "year", locale: getLocale()})
}

export function getYearsSpent(dateOfBirth: Date): string {
    return formatDistanceToNowStrict(dateOfBirth, {unit: "year", locale: getLocale()})
}

export function getLifeInWeeks(dateOfBirth: Date, lifespanInYears: number) {
    const dateOfDeath = add(dateOfBirth, {years: lifespanInYears})
    return differenceInCalendarWeeks(dateOfDeath, dateOfBirth)
}

export function getCurrentLifeWeek(dateOfBirth: Date): number {
    const now = new Date()
    return differenceInCalendarWeeks(now, dateOfBirth)
}