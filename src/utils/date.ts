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
    const yearsLeft = formatDistanceToNowStrict(dateOfDeath, {unit: "year", locale: getLocale()})
    return yearsLeft
}

export function getProductiveYearsLeft(dateOfBirth: Date, lifespanInYears: number): string {
    const dateOfDeath = add(dateOfBirth, {years: lifespanInYears - 15})
    const yearsLeft = formatDistanceToNowStrict(dateOfDeath, {unit: "year", locale: getLocale()})
    return yearsLeft
}

export function getYearsSpent(dateOfBirth: Date): string {
    const yearsLeft = formatDistanceToNowStrict(dateOfBirth, {unit: "year", locale: getLocale()})
    return yearsLeft
}

export function getWeeksSpent(dateOfBirth: Date, lifespanInYears: number): string {
    const dateOfDeath = add(dateOfBirth, {years: lifespanInYears})
    const now = new Date();
    const weeksSpent = differenceInCalendarWeeks(dateOfBirth, now)
    const weeksLeft = differenceInCalendarWeeks(now, dateOfDeath)
}